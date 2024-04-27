import asyncio
import base64

import cv2
import numpy as np
import websockets


async def send_image(frame: np.ndarray):
    async with websockets.connect("ws://65.108.33.114:8765") as websocket:
        try:
            # Convert the frame to bytes
            _, buffer = cv2.imencode(".jpg", frame)
            image_bytes = buffer.tobytes()

            # Encode the image data as base64
            image_data = base64.b64encode(image_bytes).decode()

            # Send the image data to the server
            await websocket.send(image_data)
            print("Image sent successfully!")

        except Exception as e:
            print(f"Error: {e}")


def main():
    rtsp_url = "rtsp://aaltoai:aaltoai@172.20.10.14:554/stream1"
    cap = cv2.VideoCapture(rtsp_url)
    ret, frame = cap.read()
    asyncio.get_event_loop().run_until_complete(send_image(frame))


if __name__ == "__main__":
    main()
