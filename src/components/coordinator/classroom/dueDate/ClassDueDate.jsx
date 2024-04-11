import { useState } from 'react';
import { Button, Input } from 'reactstrap'
import './dueDateStyle.css'
function ClassDueDate() {
    const [dueDate, setDueDate] = useState();

    const handleDueDateChange = (event) => {
        const newDueDate = event.target.value;
        setDueDate(newDueDate);
    };

    const handleSetDueDate = async () => {
        try {
            const response = await fetch('API_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dueDate }),
            });
            if (!response.ok) {
                throw new Error('Failed to set due date');
            }
            console.log('Due date set successfully:', dueDate);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Set Due Date for Assignment</h2>
            <div className="set-due-date">
                <Input type="date" value={dueDate} onChange={handleDueDateChange} />
                <Button onClick={handleSetDueDate}>Set Due Date</Button>
            </div>
        </div>
    );
}

export default ClassDueDate;
