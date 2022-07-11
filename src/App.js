import React, { useState } from 'react';

export default function App() {
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [prevScoreList, setPrevScoreList] = useState([]);

	const handleAnswerButtonClick = (isCorrect) => {
		const nextQuestion = currentQuestion + 1;
		if (isCorrect) {
			setScore(score + 1)
		}
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		}
		else {
			setShowScore(true);
		}
	}

	const handleResetQuizButtonClick = () => {
		setPrevScoreList([...prevScoreList, score]); // Capture this rounds score and append to the prev score list to be displayed
		setCurrentQuestion(0);
		setShowScore(false);
		setScore(0);
	}

	return (
		<div className='app'>
			{showScore ? (
				<>
					<div className='score-section'>
						You scored {score} out of {questions.length}
					</div>
					<div className='score-section'>
						{
							prevScoreList.length > 0 ? (
								<div>Previous Quiz Scores:
									<ul>
										{prevScoreList.map((prevScore) => <li>{prevScore}</li>)}
									</ul>
								</div>
							) : null
						}
					</div>
					<button style={{ display: 'block' }} onClick={handleResetQuizButtonClick}>Reset Quiz</button>
				</>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) =>
							<button onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</button>)}
					</div>
				</>
			)}
		</div>
	);
}