import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { getRandomQuestion } from "../constants";

const Question = () => {
  const [question, setQuestion] = useState(getRandomQuestion());

  const handleClick = () => {
    setQuestion(getRandomQuestion());
  };

  return (
    <Box
      borderRadius={2}
      bgcolor={"#fff689ff"}
      p={2}
      display="flex"
      flexDirection="column"
      mt={2}
      mb={2}
      justifyContent="space-around"
      width="275px"
    >
      <Typography
        style={{ color: "gray", fontSize: "12px" }}
      >{`CONVERSATION STARTER`}</Typography>
      <Box mt={2} mb={2}>
        <Typography>{question}</Typography>
      </Box>

      <Button variant="contained" onClick={handleClick}>
        Next Question
        <Box ml={2}>
          <ShuffleIcon />
        </Box>
      </Button>
    </Box>
  );
};

export default Question;
