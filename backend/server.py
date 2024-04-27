import asyncio
import base64
from flask import Flask, request, jsonify
import websockets
import numpy as np

def hangle_frame(frame):
    pass

async def handle_client(websocket):
    while True:
        try:
            # Receive the image data from the client
            image_data = await websocket.recv()
    
            # Decode the base64-encoded image data
            image_bytes = base64.b64decode(image_data)
            
            img_buffer = BytesIO(img_bytes)
            # Open the image using PIL
            img = Image.open(img_buffer)
            handle_frame(np.asarray(img))
        except KeyboardInterrupt as e:
            print("Interrupted")
            break
        except Exception as e:
            print(f"Error: {e}")
        finally:
            await websocket.close()


def main():
    start_server = websockets.serve(handle_client, "0.0.0.0", 8765)

    print("Server started on localhost:8765")
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
    main()
