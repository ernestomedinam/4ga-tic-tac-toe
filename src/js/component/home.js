import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Board } from "./Board";
import { Player } from "./Player";

//create your first component
export function Home() {
	const [status, setStatus] = useState("init"); // 'init', 'playing', 'over', 'x', 'y' (last two for game over with winners)
	const [players, setPlayers] = useState([
		{ name: "", suit: "x" },
		{ name: "", suit: "o" }
	]);
	const [turn, setTurn] = useState("x");
	return (
		<div className="container-fluid bg-dark text-white h-100">
			<div className="row justify-content-center">
				<h1 className="display-1">{"Hello, tic tac toe!"}</h1>
			</div>
			<div className="row justify-content-center">
				{status == "init" ? (
					<div className="col align-items-center">
						<h2 className="display-4 mb-5 text-center">
							{"Choose your side!"}
						</h2>
						<div className="row justify-content-center pt-5">
							{players.map(player => {
								return (
									<Player
										key={player.suit}
										suit={player.suit}
										players={players}
										setPlayers={setPlayers}
									/>
								);
							})}
						</div>
						<div className="row justify-content-center mt-5">
							<button
								disabled={
									players[0].name == "" ||
									players[1].name == ""
								}
								type="button"
								onClick={e => setStatus("playing")}
								className="btn btn-success super">
								{"start game"}
							</button>
						</div>
					</div>
				) : (
					<div className="col align-items-center">
						<h2 className="display-4 mb-5 text-center">
							{status == "playing"
								? `Your turn, ${
										players.find(
											player => player.suit == turn
										).name
								  }`
								: status == "over"
									? "The winner is the Toe!"
									: `Congratulations, ${
											players.find(
												player => player.suit == turn
											).name
									  }!!`}
						</h2>
						<div className="row justify-content-center pt-5">
							<Board
								turn={turn}
								setTurn={setTurn}
								status={status}
								setStatus={setStatus}
							/>
						</div>
						{status != "playing" && (
							<div className="row justify-content-center mt-5">
								<button
									disabled={false}
									type="button"
									onClick={e => {
										setStatus("init");
										setTurn("x");
									}}
									className="btn btn-success super mt-3">
									{"play again!"}
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
