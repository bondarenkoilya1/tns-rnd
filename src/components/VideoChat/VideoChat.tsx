// import { useRef, useState } from "react";
//
// import { FormControl } from "@mui/material";
//
// import { ContainerStyled } from "../../../styled.ts";
// import { VideoChatInputsContainer, VideoChatStyled, VideoChatTitleStyled } from "./styled.ts";
//
// import { VIDEO_CHAT_API_URL } from "../../config";
// import { useChatMessagesStore } from "../../store";
// import { ButtonComponent, Input, TextChat } from "../ui";
//
// export const VideoChat = () => {
//   const [room, setRoom] = useState<string | null>(null);
//   const [username, setUsername] = useState<string | null>(null);
//   const [websocket, setWebsocket] = useState<WebSocket | null>(null);
//   const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
//   const { chatMessages, addChatMessage } = useChatMessagesStore();
//
//   const localVideoRef = useRef<HTMLVideoElement | null>(null);
//   const remoteVideosRef = useRef<HTMLDivElement | null>(null);
//
//   const joinRoom = () => {
//     if (!room?.trim()) {
//       console.error("Пожалуйста, введите название комнаты");
//       return;
//     }
//
//     const finalUsername = username?.trim() || "Анонимный пользователь";
//     setUsername(finalUsername);
//
//     const websocketUrl = `wss://${VIDEO_CHAT_API_URL}/websocket?room=${encodeURIComponent(room)}`;
//     startConnection(websocketUrl, finalUsername);
//   };
//
//   function startConnection(websocketUrl: string, finalUsername: string) {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         console.log("Got media stream");
//         const newPeerConnection = new RTCPeerConnection();
//
//         // Display remote tracks
//         newPeerConnection.ontrack = (event) => {
//           if (event.track.kind === "audio") return;
//
//           const element = document.createElement("video");
//           element.srcObject = event.streams[0];
//           element.autoplay = true;
//           element.controls = true;
//
//           event.track.onmute = () => element.play();
//           event.streams[0].onremovetrack = ({ track }) => {
//             element.remove();
//           };
//
//           remoteVideosRef.current?.appendChild(element);
//         };
//
//         // Show local stream
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//           localVideoRef.current.onloadedmetadata = () => {
//             localVideoRef.current?.play();
//           };
//         }
//
//         stream.getTracks().forEach((track) => newPeerConnection.addTrack(track, stream));
//
//         const newWs = new WebSocket(websocketUrl);
//
//         newPeerConnection.onicecandidate = (e) => {
//           if (e.candidate) {
//             newWs.send(JSON.stringify({ event: "candidate", data: JSON.stringify(e.candidate) }));
//           }
//         };
//
//         newWs.onopen = () => {
//           console.log("WebSocket connected");
//
//           // Send offer after WebSocket opens
//           newPeerConnection.createOffer().then((offer) => {
//             newPeerConnection.setLocalDescription(offer);
//             newWs.send(JSON.stringify({ event: "offer", data: JSON.stringify(offer) }));
//           });
//         };
//
//         newWs.onclose = () => alert("WebSocket has closed");
//         newWs.onerror = (e) => console.error("WebSocket error:", e);
//
//         newWs.onmessage = (evt) => {
//           const msg = JSON.parse(evt.data);
//           if (!msg) return console.log("failed to parse msg");
//
//           switch (msg.event) {
//             case "offer":
//               const offer = JSON.parse(msg.data);
//               newPeerConnection.setRemoteDescription(offer);
//               newPeerConnection.createAnswer().then((answer) => {
//                 newPeerConnection.setLocalDescription(answer);
//                 newWs.send(JSON.stringify({ event: "answer", data: JSON.stringify(answer) }));
//               });
//               break;
//
//             case "answer":
//               const answer = JSON.parse(msg.data);
//               newPeerConnection.setRemoteDescription(answer);
//               break;
//
//             case "candidate":
//               const candidate = JSON.parse(msg.data);
//               newPeerConnection.addIceCandidate(candidate).catch(console.error);
//               break;
//
//             case "chat":
//               addChatMessage(msg.sender, msg.text);
//               break;
//           }
//         };
//
//         setWebsocket(newWs);
//         setPeerConnection(newPeerConnection);
//       })
//       .catch((error) => {
//         console.error("Media error:", error);
//       });
//   }
//
//   return (
//     <VideoChatStyled>
//       <ContainerStyled>
//         <VideoChatTitleStyled>
//           Я хочу <span>присоединится</span> к комнате:
//         </VideoChatTitleStyled>
//         <FormControl sx={{ marginTop: "50px", width: "40%" }}>
//           <VideoChatInputsContainer>
//             <Input
//               value={room}
//               placeholder="vc4zas%#askqsd123vc4zas%#askqqsd3"
//               label="С идентификатором"
//               onChange={(e) => setRoom(e.target.value)}
//               slotProps={{
//                 inputLabel: {
//                   shrink: true
//                 }
//               }}
//               sx={{ width: "49%" }}
//             />
//             <Input
//               value={username}
//               placeholder="Максим Сергеевич"
//               label="Под именем"
//               onChange={(e) => setUsername(e.target.value)}
//               slotProps={{
//                 inputLabel: {
//                   shrink: true
//                 }
//               }}
//               sx={{ width: "49%" }}
//             />
//           </VideoChatInputsContainer>
//           <ButtonComponent
//             onClick={joinRoom}
//             color="primary"
//             size="medium"
//             variant="contained"
//             style={{ width: "50%", margin: "20px auto 0 auto" }}>
//             Присоедениться
//           </ButtonComponent>
//         </FormControl>
//         {/*<h3>Local Video</h3>*/}
//         {/*<UserVideo videoRef={localVideoRef} username={username} />*/}
//         {/*<h3>Remote Video</h3>*/}
//         {/*<div ref={remoteVideosRef} />*/}
//         <TextChat chatMessages={chatMessages} websocket={websocket} username={username} />
//       </ContainerStyled>
//     </VideoChatStyled>
//   );
// };
