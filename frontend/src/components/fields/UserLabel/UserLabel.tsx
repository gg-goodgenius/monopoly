import { userInfo } from 'os';
import { useContext } from 'react'
import { StateContext } from './../../../context/State'

function UserLabel(props: any) {
	const { gameState } = useContext(StateContext)
	return (
		<div className="label">
            {gameState?.users.filter((e: any) => e.positionFieldId == props.id).map((user: any) => {
				return <div className='labelUser' key={user.index} style={{backgroundColor:user.color}}></div>
			})
			}
		</div>
	)

}

export default UserLabel;