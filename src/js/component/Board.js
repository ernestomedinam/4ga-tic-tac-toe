import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

export const Board = ({ turn, setTurn, status, setStatus }) => {
	const [board, setBoard] = useState([
		[null, null, null],
		[null, null, null],
		[null, null, null]
	]);

	const handlePlay = useCallback(
		(rowIndex, colIndex) => {
			if (board[rowIndex][colIndex] == null) {
				let newBoard = [...board];
				newBoard[rowIndex][colIndex] = turn;
				setBoard(newBoard);
			}
		},
		[board, turn, setTurn, setBoard]
	);
	useEffect(
		() => {
			const checkForWinner = () => {
				let winner = "";
				let cols = [[], [], []];
				for (let row of board) {
					if (row[0] && row[0] == row[1] && row[1] == row[2]) {
						winner = row[0];
						break;
					}
					cols[0].push(row[0]);
					cols[1].push(row[1]);
					cols[2].push(row[2]);
				}
				if (winner == "") {
					for (let col of cols) {
						if (col[0] && col[0] == col[1] && col[1] == col[2]) {
							winner = col[0];
							break;
						}
					}
					if (winner == "") {
						if (
							(board[1][1] &&
								board[0][0] == board[1][1] &&
								board[1][1] == board[2][2]) ||
							(board[1][1] &&
								board[2][0] == board[1][1] &&
								board[1][1] == board[0][2])
						) {
							winner = board[1][1];
						}
					}
				}
				return winner;
			};
			const checkIfOver = () => {
				let turnsLeft = board.reduce((rowAcc, row) => {
					let rowTotal = row.reduce((cellAcc, cell) => {
						if (cell != null) {
							return cellAcc;
						} else {
							return cellAcc + 1;
						}
					}, 0);
					return rowAcc + rowTotal;
				}, 0);
				console.log(`this are turns left: ${turnsLeft}`);
				return turnsLeft < 1;
			};
			const checkAllNull = () => {
				for (let row of board) {
					for (let cell of row) {
						if (cell != null) {
							return false;
						}
					}
				}
				return true;
			};
			if (status == "playing") {
				let winner = checkForWinner();
				console.log(`this is winner: ${winner}`);
				if (winner != "") {
					setStatus(winner);
				} else {
					if (checkIfOver()) {
						setStatus("over");
					} else {
						if (!checkAllNull()) {
							setTurn(turn == "x" ? "o" : "x");
						}
					}
				}
			}
		},
		[status, board, setStatus]
	);
	return (
		<div className="d-flex flex-column align-items-center">
			<div className="row d-flex flex-wrap board">
				{board.map((row, rowIndex) => {
					return (
						<React.Fragment key={rowIndex}>
							{row.map((cell, index) => {
								return (
									<div
										key={index}
										className={`col-4 d-flex justify-content-center align-items-center cell b-row-${rowIndex} b-col-${index}${
											cell == null && status == "playing"
												? " clickable"
												: ""
										}`}
										onClick={e => {
											if (status == "playing") {
												handlePlay(rowIndex, index);
											}
										}}>
										<div className="badge">
											{cell == "x"
												? "✖"
												: cell == "o"
													? "⭕"
													: null}
										</div>
									</div>
								);
							})}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

Board.propTypes = {
	turn: PropTypes.string,
	setTurn: PropTypes.func,
	status: PropTypes.string,
	setStatus: PropTypes.func
};
