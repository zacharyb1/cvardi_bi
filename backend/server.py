import asyncio
import base64

import websockets


async def handle_client(websocket, path):
    try:
        # Receive the image data from the client
        image_data = await websocket.recv()

        # Decode the base64-encoded image data
        image_bytes = base64.b64decode(image_data)

        # Save the image to a file
        with open("received_image.png", "wb") as f:
            f.write(image_bytes)

        print("Image received and saved successfully!")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        await websocket.close()


def main():
    start_server = websockets.serve(handle_client, "localhost", 8765)

    print("Server started on localhost:8765")
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
    main()
