import React, { useState } from 'react';
import { Box, Button, Text, Input, VStack, Heading } from '@chakra-ui/react';

const Index = () => {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [hint, setHint] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    if (gameOver) return;

    const numGuess = parseInt(guess);
    if (isNaN(numGuess)) {
      setHint('Please enter a valid number');
      return;
    }

    if (numGuess === targetNumber) {
      setHint('Congratulations! You guessed the number!');
      setGameOver(true);
    } else {
      setAttempts(attempts - 1); // Decrement attempts first
      if (attempts - 1 === 0) {
         setHint(`Game over! The number was ${targetNumber}.`);
         setGameOver(true);
      } else {
         setHint(numGuess < targetNumber ? 'Think higher!' : 'Think lower!');
      }
    }
    setGuess('');
  };

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(3);
    setHint('');
    setGameOver(false);
  };

  return (
    <VStack spacing={4} align="center" justify="center" minHeight="100vh">
      <Heading mb={6}>Number Guessing Game</Heading>
      <Text fontSize="lg">{gameOver ? hint : `Hint: ${hint}`}</Text>
      <Text fontSize="lg">Attempts left: {attempts}</Text>
      <Input
        placeholder="Enter a number between 1 and 100"
        value={guess}
        onChange={handleInputChange}
        isDisabled={gameOver}
      />
      <Button colorScheme="blue" onClick={handleGuess} disabled={gameOver}>
        Guess
      </Button>
      <Button colorScheme="teal" onClick={resetGame}>
        Reset Game
      </Button>
    </VStack>
  );
};

export default Index;