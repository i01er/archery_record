import "../styles/Home.module.css";
import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const roundAttemptInitValues = {
  round: null,
  attempt: null
};

export default function App() {
  const [rounds, setRounds] = useState(6);
  const [shots, setshots] = useState(6);
  const [gameInfo, setGameInfo] = useState({
    roundScores: []
  });
  const [roundAttemptSelected, setRoundAttemptSelected] = useState(
    roundAttemptInitValues
  );
  const numPad = ['M',1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'X'];

  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = useCallback(() => {
    setModalOpen(false);
    setRoundAttemptSelected(roundAttemptInitValues);
  }, []);

  useEffect(() => {
    const initScores = Array.apply(null, Array(rounds)).map(() => {
      return Array.apply(null, Array(shots)).map(() => 0);
    });
    const initGameInfo = {
      roundScores: initScores
    };
    setGameInfo(initGameInfo);
  }, [rounds]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  const updateScore = useCallback(
    (round, attempt, mark) => {
      const tGameInfo = { ...gameInfo };
      const { roundScores } = tGameInfo;

      roundScores[round][attempt] = mark;

      tGameInfo.roundScores = roundScores;
      setGameInfo(tGameInfo);
    },
    [gameInfo]
  );

  function sumScore(rs) {
    var _rs = rs;
    _rs.forEach((element, index) => {
      if (element === 'M') {
        _rs[index] = 0;
      }
      if (element === 'X') {
        _rs[index] = 10;
      }      
    });
    return +_rs[0] + _rs[1] + _rs[2];
  }

  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 3 }}>
          <Grid container sx={{ marginBottom: 1 }}>
            <Grid item xs={4}>
              &nbsp;
            </Grid>
            <Grid item xs={4}>
              &nbsp;
            </Grid>
            <Grid item xs={4}>
              &nbsp;
            </Grid>
          </Grid>
          {gameInfo.roundScores.map((rs, roundIndex) => {
            return (
              <Box>
                <Typography sx={{ textAlign: "left" }}>
                  Round {roundIndex + 1}
                </Typography>
                <Grid container sx={{ marginBottom: 1 }}>
                  {rs.map((s, attemptIndex) => {
                    return (
                      <Grid item xs={4}>
                        <Box border={1}>
                          <Button
                            onClick={() => {
                              setModalOpen(true);
                              setRoundAttemptSelected({
                                round: roundIndex,
                                attempt: attemptIndex
                              });
                            }}
                          >
                            {s}
                          </Button>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            );
          })}
        </Box>
        <Box sx={{ flex: 2 }}>
          <Grid container sx={{ marginBottom: 1 }}>
            <Grid item xs={6} sx={{ backgroundColor: "red" }}>
              Rounds: {rounds}
            </Grid>
            <Grid item xs={6} sx={{ backgroundColor: "red" }}>
              Shots: {shots}
            </Grid>
          </Grid>
          {gameInfo.roundScores.map((rs) => {
            return (
              <Box>
                <Typography>&nbsp;</Typography>
                <Grid container sx={{ marginBottom: 1 }}>
                  <Grid item xs={6}>
                    <Box border={1}>
                      <Button sx={{ color: "black" }}>
                        {sumScore(rs)}
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <Box border={1}>
                      <Button sx={{ color: "black" }}>
                        {+rs[3] + rs[4] + rs[5]}
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box border={1}>
                      <Button sx={{ color: "black" }}>
                        {rs.reduce((prev, curr) => {
                          return prev + curr;
                        }, 0)}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={style}>
          <Grid container>
            {numPad.map((mark) => {
              return (
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      updateScore(
                        roundAttemptSelected?.round,
                        roundAttemptSelected?.attempt,
                        mark
                      );
                      handleClose();
                    }}
                  >
                    {mark}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
