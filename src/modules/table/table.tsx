import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from "./waiter.module.css";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Router, useRouter } from "next/router";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BasicModal from "common/modalGenerator/Modal";
import ModalSupport from "./ModalSupport";
import CustomCard from "./CustomCard";
import { userestaurantStore } from "store/restaurant/restaurantStore";
import FloorStructure from "./FloorStructure";
import FloorWiseTable from "./FloorWiseTable";
import { useQuery } from "@tanstack/react-query";
import { getTables } from "store/api/axiosSetup";
import { useUserStore } from "store/user/userzustandstore";
import TopBar from "common/topBar/TopBar";
import { flexBox } from "theme/defaultFunction";


export const Waiter = () => {
  const [openModel, setOpenModel] = useState(false);

  const router = useRouter();
  const restroDetails = userestaurantStore(state => state);
  const userDetails = useUserStore(state => state.user);
  const [infoSelected, setinfoSelected] = useState({
    table: "",
    floor: "ALL"
  });
  const { isLoading, isError, data, error } = useQuery(
    {
      queryKey: ['getTable'],
      queryFn: () => getTables(
        userDetails?.jwtToken, userDetails?.restaurantLinked
      ),
      refetchIntervalInBackground:true,
      onSuccess: (data) => {
        restroDetails.setFloors(data?.data?.data)
      }
    })
  console.log({
    isLoading, isError, data: data?.data?.data, error, restroDetails
  })
  return (
    <div className={styles.container}>
      <Stack sx={{
        width:"100%",
        pl:{
          xs:0,
          sm:2
        },
        pt:{
          xs:1,
          sm:0
        }
      }}>
        <TopBar title={"Table Booking"} backUrl="/" home={true}>
          <Stack direction={"row"} sx={{justifyContent:'end', p:1, pt:2,pr:{
            xs:1,
            md:5
          }, gap:1, flex:1}}>
            <FloorStructure infoSelected={infoSelected} setinfoSelected={setinfoSelected} restroDetails={restroDetails?.restaurant?.floors} />
            <Tooltip title="Help" sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}> 
              <IconButton color="info" onClick={() => setOpenModel(true)}><QuestionMarkIcon /></IconButton>
            </Tooltip>
          </Stack>

        </TopBar>
      </Stack>
      {isLoading?
      <Stack>
        <CircularProgress/>
      </Stack>
      :
      <Stack sx={{
        height: "fit-content",
        width: "100%",
        overflowY: "auto",
        p: 2,
        pb: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 2
      }}>
        <FloorWiseTable infoSelected={infoSelected} restroDetails={restroDetails?.restaurant?.floors} />
      </Stack>}
      
      <BasicModal title={"Representations"} open={openModel} setOpen={setOpenModel}>
        <ModalSupport />
      </BasicModal>
    </div>
  );
};
