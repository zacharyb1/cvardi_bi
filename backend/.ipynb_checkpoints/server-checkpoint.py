import asyncio
import base64
import datetime
from io import BytesIO

import numpy as np
import websockets
from PIL import Image


def handle_frame(frame: np.ndarray):
    Image.fromarray(frame).save(f"images/{str(datetime.datetime.now())}.jpg")


async def handle_client(websocket):
    try:
        while True:
            # Receive the image data from the client
            image_data = await websocket.recv()
            # Decode the base64-encoded image data
            image_bytes = base64.b64decode(image_data)
            img_buffer = BytesIO(image_bytes)
            # Open the image using PIL
            img = Image.open(img_buffer)
            handle_frame(np.asarray(img))
    except KeyboardInterrupt as e:
        print("Interrupted")
    except Exception as e:
        print(f"Error: {e}")
        pass
    finally:
        await websocket.close()


def main():
    start_server = websockets.serve(handle_client, "0.0.0.0", 8765)

    print("Server started on localhost:8765")
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
    main()
