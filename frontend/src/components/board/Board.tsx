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

interface objectType {
	color: string;
	name: string;
	price: number;
}


function Board() {
	const cards: objectType[] = [
		{
			color: "dark-purple",
			name: "MEDITER-RANEAN AVENUE",
			price: 0.5,
		},
		{
			color: "dark-purple",
			name: "BALTIC AVENUE",
			price: 0.5,
		},
		{
			color: "light-blue",
			name: "ORIENTAL AVENUE",
			price: 1,
		},
		{
			color: "light-blue",
			name: "VERMONT AVENUE",
			price: 1,
		},
		{
			color: "light-blue",
			name: "CONNECTICUT AVENUE",
			price: 1.2,
		},
		{
			color: "purple",
			name: "ST. CHARLES PLACE",
			price: 1.4,
		},
		{
			color: "purple",
			name: "STATES AVENUE",
			price: 1.4,
		},
		{
			color: "purple",
			name: "VIRGINIA AVENUE",
			price: 1.6,
		},
		{
			color: "orange",
			name: "ST. JAMES AVENUE",
			price: 1.8,
		},
		{
			color: "orange",
			name: "TENNESSEE AVENUE",
			price: 1.8,
		},
		{
			color: "orange",
			name: "NEW YORK AVENUE",
			price: 2,
		},
		{
			color: "red",
			name: "KENTUCKY AVENUE",
			price: 2.2,
		},
		{
			color: "red",
			name: "INDIANA AVENUE",
			price: 2.2,
		},
		{
			color: "red",
			name: "ILLINOIS AVENUE",
			price: 2,
		},
		{
			color: "yellow",
			name: "ATLANTIC AVENUE",
			price: 2.6,
		},
		{
			color: "yellow",
			name: "VENTNOR AVENUE",
			price: 2.6,
		},
		{
			color: "yellow",
			name: "MARVIN GARDENS",
			price: 2.8,
		},
		{
			color: "green",
			name: "PACIFIC AVENUE",
			price: 3,
		},
		{
			color: "green",
			name: "NORTH CAROLINA AVENUE",
			price: 3,
		},
		{
			color: "green",
			name: "PENNSYLVANIA AVENUE",
			price: 3.2,
		},
		{
			color: "dark-blue",
			name: "PARK PLACE",
			price: 3.5,
		},
		{
			color: "dark-blue",
			name: "BOARDWALK",
			price: 4,
		},
	]
	const railroads: string[] = [
		'READING RAILROAD',
		'PENNSYLVANIA RAILROAD',
		'B & O RAILROAD',
		'SHORT LINE'
	]
	return (
		<div className="table">
			<div className="board">
				<CenterField />
				<StartField />


				<div className="row horizontal-row bottom-row">
					<ObjectField {...cards[4]} />
					<ChanceField />
					<ObjectField {...cards[3]} />
					<ObjectField {...cards[2]} />
					<RailRoadField name={railroads[0]} />
					<TaxField lux={false} />
					<ObjectField {...cards[1]} />
					<ChestField />
					<ObjectField {...cards[0]} />
				</div>

				<JailField />

				<div className="row vertical-row left-row">
					<ObjectField {...cards[5]} />
					<SharedField electric={true} />
					<ObjectField {...cards[6]} />
					<ObjectField {...cards[7]} />
					<RailRoadField name={railroads[1]} />
					<ObjectField {...cards[8]} />
					<ChestField />
					<ObjectField {...cards[9]} />
					<ObjectField {...cards[10]} />
				</div>

				<ParkingField />

				<div className="row horizontal-row top-row">
					<ObjectField {...cards[11]} />
					<ChanceField />
					<ObjectField {...cards[12]} />
					<ObjectField {...cards[13]} />
					<RailRoadField name={railroads[2]} />
					<ObjectField {...cards[14]} />
					<ObjectField {...cards[15]} />
					<SharedField electric={false} />
					<ObjectField {...cards[16]} />
				</div>

				<GoJailField />

				<div className="row vertical-row right-row">
					<ObjectField {...cards[17]} />
					<ObjectField {...cards[18]} />
					<ChestField />
					<ObjectField {...cards[19]} />
					<RailRoadField name={railroads[3]} />
					<ChanceField />
					<ObjectField {...cards[20]} />
					<TaxField lux={true} />
					<ObjectField {...cards[21]} />
				</div>
			</div>
		</div>
	);
}

export default Board;
