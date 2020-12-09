import React from "react";
import PropTypes from "prop-types";

export const Player = ({ suit, players, setPlayers }) => {
	return (
		<div className="col-3 d-flex flex-column align-items-center">
			<input
				className="form-control mb-3 super"
				type="text"
				value={players.find(player => player.suit == suit).name}
				onChange={e =>
					setPlayers(
						players.map(player => {
							if (player.suit == suit) {
								player.name = e.target.value;
							}
							return player;
						})
					)
				}
			/>
			<div className="badge">
				<p className="mb-2">{suit == "x" ? "✖" : "⭕"}</p>
			</div>
		</div>
	);
};

Player.propTypes = {
	suit: PropTypes.string,
	players: PropTypes.array,
	setPlayers: PropTypes.func
};
