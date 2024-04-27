import asyncio
import base64
import queue
import threading
import time

import cv2
import numpy as np
import websockets


# bufferless VideoCapture
class VideoCapture:
    def __init__(self, name):
        self.cap = cv2.VideoCapture(name)
        self.q = queue.Queue()
        t = threading.Thread(target=self._reader)
        t.daemon = True
        t.start()

    # read frames as soon as they are available, keeping only most recent one
    def _reader(self):
        while True:
            ret, frame = self.cap.read()
            if not ret:
                break
            if not self.q.empty():
                try:
                    self.q.get_nowait()  # discard previous (unprocessed) frame
                except queue.Empty:
                    pass
            self.q.put(frame)

    def read(self):
        return self.q.get()


async def send_image(nocap: VideoCapture):
    async with websockets.connect("ws://65.108.33.114:8765", max_size=2**20 * 5) as websocket:
        while True:
            try:
                # Convert the frame to bytes
                frame = nocap.read()
                _, buffer = cv2.imencode(".jpg", frame)
                image_bytes = buffer.tobytes()

                # Encode the image data as base64
                image_data = base64.b64encode(image_bytes).decode()

                # Send the image data to the server
                await websocket.send(image_data)
                print("Image sent successfully! Sleeping for 2 seconds...")
                await asyncio.sleep(2)
                print("Waking up...")
            except Exception as e:
                print(f"Error: {e}")


def main():
    rtsp_url = "rtsp://aaltoai:aaltoai@172.20.10.14:554/stream1"
    nocap = VideoCapture(rtsp_url)
    asyncio.get_event_loop().run_until_complete(send_image(nocap))


if __name__ == "__main__":
    main()
