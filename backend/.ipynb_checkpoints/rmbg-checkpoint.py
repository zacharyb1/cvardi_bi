import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image
from torchvision.transforms.functional import normalize
from transformers import AutoModelForImageSegmentation
from skimage import io

class BackgroundRemoval:
    def __init__(self) -> None:
        self.model = AutoModelForImageSegmentation.from_pretrained(
            "briaai/RMBG-1.4", trust_remote_code=True
        )
        self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)
        self.model_input_size = [1024, 1024]

    def preprocess_image(self, im: np.ndarray) -> torch.Tensor:
        if len(im.shape) < 3:
            im = im[:, :, np.newaxis]
        im_tensor = torch.tensor(im, dtype=torch.float32).permute(2, 0, 1)
        im_tensor = F.interpolate(
            torch.unsqueeze(im_tensor, 0), size=self.model_input_size, mode="bilinear"
        )
        image = torch.divide(im_tensor, 255.0)
        image = normalize(image, [0.5, 0.5, 0.5], [1.0, 1.0, 1.0])
        return image

    def postprocess_image(self, result: torch.Tensor, im_size: list) -> np.ndarray:
        result = torch.squeeze(F.interpolate(result, size=im_size, mode="bilinear"), 0)
        ma = torch.max(result)
        mi = torch.min(result)
        result = (result - mi) / (ma - mi)
        im_array = (result * 255).permute(1, 2, 0).cpu().data.numpy().astype(np.uint8)
        im_array = np.squeeze(im_array)
        return im_array

    def remove_background(self, orig_im: np.ndarray):
        orig_im_size = orig_im.shape[0:2]
        image = self.preprocess_image(orig_im).to(self.device)
        result = self.model(image)
        result_image = self.postprocess_image(result[0][0], orig_im_size)
        pil_im = Image.fromarray(result_image)
        no_bg_image = Image.new("RGBA", pil_im.size, (0, 0, 0, 0))
        orig_image = Image.fromarray(orig_im)
        no_bg_image.paste(orig_image, mask=pil_im)
        return no_bg_image
        