export interface SharedModalProps {
  index: number;
  images: string[];
  currentPhoto?: string;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}
