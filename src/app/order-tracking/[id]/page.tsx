"use client";

import { socket } from "@/services/socket";
import useStore from "@/store/store";
import { TSearchAddressToCoordsRes } from "@/types/api.type";
import axios from "axios";
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Map = dynamic(() => import("./components/map"), { ssr: false });

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Tracking = ({ params }: { params: { id: string } }) => {
  const { userInfo } = useStore();
  const [trackingInfo, setTrackingInfo] =
    useState<TSearchAddressToCoordsRes | null>(null);
  const [coords, setCoords] = useState<[LatLngTuple, LatLngTuple] | null>(null);

  const getTrackingInfo = async (orderId: string) => {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_API_URL}tracking/order/${orderId}`,
      method: "GET",
    });
    const data = response.data as TSearchAddressToCoordsRes;
    setTrackingInfo(data);
  };

  const onConnect = () => {
    socket.emit("listenTrackingCoords", JSON.stringify({ orderId: params.id }));
    socket.on("receiveTrackingCoords", (dataString: string) => {
      const data = JSON.parse(dataString) as [LatLngTuple, LatLngTuple];
      setCoords(data);
    });
  };

  const onDisconnect = () => {};

  useEffect(() => {
    if (userInfo && params && params.id) {
      socket.auth = { accessToken: userInfo.accessToken };
      socket.connect();
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
    }
  }, [userInfo, params]);

  return (
    <Container>
      {coords && (
        <Map
          targetCoords={[coords[0][0], coords[0][1]]}
          driverCoords={[coords[1][0], coords[1][1]]}
        />
      )}
    </Container>
  );
};

export default Tracking;
