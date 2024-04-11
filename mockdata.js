export const mockUsers = [
    { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { id: 2, email: 'manager@example.com', password: 'manager123', role: 'manager' },
    { id: 3, email: 'coordinator@example.com', password: 'coordinator123', role: 'coordinator' },
    { id: 4, email: 'student@example.com', password: 'student123', role: 'student' },
];

export const mockStudent = [
    { id: 1, email: 'admin@example.com', schoolID: 'GCS2001', name: 'A', academicYear: '2022-2026' },
    { id: 2, email: 'admin@example.com', schoolID: 'GCS2002', name: 'B', academicYear: '2022-2026' },
    { id: 3, email: 'admin@example.com', schoolID: 'GCS2003', name: 'C', academicYear: '2022-2026' },
    { id: 4, email: 'admin@example.com', schoolID: 'GCS2004', name: 'D', academicYear: '2022-2026' },
    { id: 5, email: 'admin@example.com', schoolID: 'GCS2005', name: 'E', academicYear: '2022-2026' },
    { id: 6, email: 'admin@example.com', schoolID: 'GCS2006', name: 'F', academicYear: '2022-2026' },
]

const mockData = [
    {
        id: '1',
        date: '2024-04-01',
        submissionTitle: 'Assignment 1',
        studentID: '123456',
        grade: 'A',
        comment: 'Well done!',
        graded: 'Graded',
        files: [
            { fileName: 'assignment1.pdf' },
            { fileName: 'assignment1.docx' },
        ],
    },
    {
        id: '2',
        date: '2024-04-05',
        submissionTitle: 'Assignment 2',
        studentID: '789012',
        grade: 'B',
        comment: 'Good effort.',
        graded: 'Ungraded',
        files: [
            { fileName: 'assignment2.pdf' },
        ],
    },
    // Add more mock submissions here if needed
];

export default mockData;
