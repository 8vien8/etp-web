import { useEffect, useState } from 'react';
import './style/FireWorksStyle.css';
import MyIcon from '../../utils/icon/MyIcon';


const Fireworks = () => {
    const [fireworks, setFireworks] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (fireworks.length < 12) {
                setFireworks(prevFireworks => [
                    ...prevFireworks,
                    { left: `${Math.random() * 80}vw` }
                ]);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [fireworks]);

    return (
        <div className="fireworks-container">
            {fireworks.map((firework, index) => (
                <MyIcon
                    key={index}
                    className="firework"
                    style={{ left: firework.left }}
                ></MyIcon>
            ))}
        </div>
    );
}

export default Fireworks;
