import { useRef, useState } from "react";
import { TextChat } from "../ui";
import { useChatMessagesStore } from "../../store";

export const VideoChat = () => {
  const [room, setRoom] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideosRef = useRef<HTMLDivElement | null>(null);

  // zustand
  const { chatMessages, addChatMessage } = useChatMessagesStore();

  const joinRoom = () => {
    if (!room?.trim()) {
      console.error("Пожалуйста, введите название комнаты");
      return;
    }

    const finalUsername = username?.trim() || "Анонимный пользователь";
    setUsername(finalUsername);

    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const websocketUrl = `${protocol}://${location.host}/websocket?room=${encodeURIComponent(room)}`;
    startConnection(websocketUrl, finalUsername);
  };

  function startConnection(websocketUrl: string, finalUsername: string) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log("Got media stream");
        const newPeerConnection = new RTCPeerConnection();

        // Display remote tracks
        newPeerConnection.ontrack = (event) => {
          if (event.track.kind === "audio") return;

          const element = document.createElement("video");
          element.srcObject = event.streams[0];
          element.autoplay = true;
          element.controls = true;

          event.track.onmute = () => element.play();
          event.streams[0].onremovetrack = ({ track }) => {
            element.remove();
          };

          remoteVideosRef.current?.appendChild(element);
        };

        // Show local stream
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.onloadedmetadata = () => {
            localVideoRef.current?.play();
          };
        }

        stream.getTracks().forEach((track) => newPeerConnection.addTrack(track, stream));

        const newWs = new WebSocket(websocketUrl);

        newPeerConnection.onicecandidate = (e) => {
          if (e.candidate) {
            newWs.send(JSON.stringify({ event: "candidate", data: JSON.stringify(e.candidate) }));
          }
        };

        newWs.onopen = () => {
          console.log("WebSocket connected");

          // Send offer after WebSocket opens
          newPeerConnection.createOffer().then((offer) => {
            newPeerConnection.setLocalDescription(offer);
            newWs.send(JSON.stringify({ event: "offer", data: JSON.stringify(offer) }));
          });
        };

        newWs.onclose = () => alert("WebSocket has closed");
        newWs.onerror = (e) => console.error("WebSocket error:", e);

        newWs.onmessage = (evt) => {
          const msg = JSON.parse(evt.data);
          if (!msg) return console.log("failed to parse msg");

          switch (msg.event) {
            case "offer":
              const offer = JSON.parse(msg.data);
              newPeerConnection.setRemoteDescription(offer);
              newPeerConnection.createAnswer().then((answer) => {
                newPeerConnection.setLocalDescription(answer);
                newWs.send(JSON.stringify({ event: "answer", data: JSON.stringify(answer) }));
              });
              break;

            case "answer":
              const answer = JSON.parse(msg.data);
              newPeerConnection.setRemoteDescription(answer);
              break;

            case "candidate":
              const candidate = JSON.parse(msg.data);
              newPeerConnection.addIceCandidate(candidate).catch(console.error);
              break;

            case "chat":
              addChatMessage(msg.sender, msg.text);
              break;
          }
        };

        setWebsocket(newWs);
        setPeerConnection(newPeerConnection);
      })
      .catch((error) => {
        console.error("Media error:", error);
      });
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>Join Room</h3>
      <input
        value={room || ""}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter room name"
        style={{ marginRight: 10 }}
      />
      <input
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Your name"
        style={{ marginRight: 10 }}
      />
      <button onClick={joinRoom}>Join</button>

      <h3>Local Video</h3>
      <video ref={localVideoRef} width="160" height="120" autoPlay muted />

      <h3>Remote Video</h3>
      <div ref={remoteVideosRef} />

      <TextChat chatMessages={chatMessages} websocket={websocket} username={username} />
    </div>
  );
};
