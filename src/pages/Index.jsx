import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Input, VStack, Heading } from '@chakra-ui/react';

const Index = () => {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [hint, setHint] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Handle the countdown timer and game over conditions
  useEffect(() => {
    // Timer should only run if there's time left and the game isn't over
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      // Handle game over when time runs out
      setHint('Time is up! Game over!');
      setGameOver(true);
    }
  }, [timeLeft, gameOver]); // Depend on timeLeft and gameOver to manage timer updates

  const handleGuess = () => {
    if (gameOver) return;

    const numGuess = parseInt(guess);
    if (isNaN(numGuess)) {
      setHint('Please enter a valid number');
      return;
    }

    // Check if the guessed number is correct
    if (numGuess === targetNumber) {
      setHint('Congratulations! You guessed the number!');
      setGameOver(true);
    } else {
      // Decrement attempts and provide feedback
      setAttempts(attempts - 1);
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

  // Reset the game to initial state
  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(3);
    setHint('');
    setGameOver(false);
    setTimeLeft(30); // Reset the timer to 30 seconds
  };

  return (
    <VStack spacing={4} align="center" justify="center" minHeight="100vh">
      <Heading mb={6}>Number Guessing Game</Heading>
      <Text fontSize="lg">{gameOver ? hint : `Hint: ${hint}`}</Text>
      <Text fontSize="lg">Attempts left: {attempts}</Text>
      <Text fontSize="lg">Time left: {timeLeft} seconds</Text>
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