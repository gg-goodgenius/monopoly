import React from 'react';
import CenterField from '../fields/Center/Center';
import ChanceField from '../fields/Chance/Chance';
import ChestField from '../fields/Chest/Chest';
import GoJailField from '../fields/GoJail/GoJail';
import JailField from '../fields/Jail/Jail';
import ObjectField from '../fields/Object/Object';
import ParkingField from '../fields/Parking/Parking';
import RailRoadField from '../fields/RailRoad/RailRoad';
import SharedField from '../fields/Shared/Shared';
import StartField from '../fields/Start/Start';
import TaxField from '../fields/Tax/Tax';
import './Board.css';
import { useContext } from 'react'
import { StateContext } from './../../context/State'


interface objectType {
	color: string;
	name: string;
	price: number;
}


function Board() {
	const { gameState } = useContext(StateContext)
	console.log(gameState);
	
	return (
		<>
			{gameState?.fields &&
				<div className="table">
					<div className="board">
						<CenterField />
						<StartField {...gameState.fields[0]} />
						<div className="row horizontal-row bottom-row">
							<ObjectField {...gameState?.fields[9]} />
							<ChanceField {...gameState?.fields[8]}/>
							<ObjectField {...gameState?.fields[7]} />
							<ObjectField {...gameState?.fields[6]} />
							<RailRoadField {...gameState?.fields[5]} />
							<TaxField lux={false} {...gameState?.fields[4]}/>
							<ObjectField {...gameState?.fields[3]} />
							<ChestField {...gameState?.fields[2]}/>
							<ObjectField {...gameState?.fields[1]} />
						</div>

						<JailField {...gameState?.fields[10]} />

						<div className="row vertical-row left-row">
							<ObjectField {...gameState?.fields[11]} />
							<SharedField electric={true} {...gameState?.fields[12]}/>
							<ObjectField {...gameState?.fields[13]} />
							<ObjectField {...gameState?.fields[14]} />
							<RailRoadField {...gameState?.fields[15]} />
							<ObjectField {...gameState?.fields[16]} />
							<ChestField {...gameState?.fields[17]}/>
							<ObjectField {...gameState?.fields[8]} />
							<ObjectField {...gameState?.fields[19]} />
						</div>

						<ParkingField {...gameState?.fields[20]}/>

						<div className="row horizontal-row top-row">
							<ObjectField {...gameState?.fields[21]} />
							<ChanceField {...gameState?.fields[22]}/>
							<ObjectField {...gameState?.fields[23]} />
							<ObjectField {...gameState?.fields[24]} />
							<RailRoadField {...gameState?.fields[25]} />
							<ObjectField {...gameState?.fields[26]} />
							<ObjectField {...gameState?.fields[27]} />
							<SharedField electric={false} {...gameState?.fields[28]}/>
							<ObjectField {...gameState?.fields[29]} />
						</div>

						<GoJailField {...gameState?.fields[30]}/>

						<div className="row vertical-row right-row">
							<ObjectField {...gameState?.fields[31]} />
							<ObjectField {...gameState?.fields[32]} />
							<ChestField {...gameState?.fields[33]}/>
							<ObjectField {...gameState?.fields[34]} />
							<RailRoadField {...gameState?.fields[35]} />
							<ChanceField {...gameState?.fields[36]}/>
							<ObjectField {...gameState?.fields[37]} />
							<TaxField lux={true} {...gameState?.fields[38]}/>
							<ObjectField {...gameState?.fields[39]} />
						</div>
					</div>
				</div>
			}
			{!gameState?.fields &&
				<div className="messageWait">
					Wait start game
				</div>
			}
		</>
	);
}

export default Board;
