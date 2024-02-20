import React, { useState } from 'react';
import './Questions.scss';
import SearchingForm from '../SearchingForm/SearchingForm';
// import {questions} from '../../Dataset/questions.js';

const questions = [
    { questionNo: 1, branch: 'Computer Science', description: 'Given an array of size n, write a program to check if the given array is sorted in (ascending / Increasing / Non-decreasing) order or not. If the array is sorted then return True, Else return False.', link: 'https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/', difficulty: 'Medium', company: 'App Perfect', year: 2023 },
    { questionNo: 2, branch: 'Computer Science', description: 'Given an integer n, return true if it is a power of two. Otherwise, return false, An integer n is a power of two, if there exists an integer x such that n == 2x.', link: 'https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1?page=1&sortBy=submissions', difficulty: 'Hard', company: 'Wipro', year: 2022 },
    { questionNo: 3, branch: 'Computer Science', description: 'You are given an array of ‘N’ integers. You need to find the length of the longest sequence which contains the consecutive elements.', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', company: 'KanSoftware', year: 2021 },
    { questionNo: 4, branch: 'Computer Science', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2022 },
    { questionNo: 5, branch: 'Computer Science', description: 'Sample question 1', link: '', difficulty: 'Medium', company: 'ABC Corp', year: 2022 },
    { questionNo: 6, branch: 'Computer Science', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2020 },
    { questionNo: 7, branch: 'Computer Science', description: 'Sample question 1', link: '', difficulty: 'Medium', company: 'ABC Corp', year: 2021 },
    { questionNo: 8, branch: 'Electrical Engineering', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2020 },
    { questionNo: 9, branch: 'Electrical Engineering', description: 'Sample question 1', link: '', difficulty: 'Medium', company: 'ABC Corp', year: 2021 },
    { questionNo: 10, branch: 'Electrical Engineering', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2021 },
    { questionNo: 11, branch: 'Electrical Engineering', description: 'Sample question 1', link: '', difficulty: 'Medium', company: 'ABC Corp', year: 2022 },
    { questionNo: 12, branch: 'Electrical Engineering', description: 'Sample question 2', link: '', difficulty: 'Hard', company: 'XYZ Inc', year: 2022 },
    // Add more questions as needed
];

const Question = () => {
    const [selectedBranch, setSelectedBranch] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);

    const MAX_WORDS = 10;           // Maximum words before truncation

    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const toggleQuestionExpansion = (index) => {
        setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    const truncateString = (str) => {
        return str.split(' ').slice(0, MAX_WORDS).join(' ');
    };

    return (
        < div className="question">
            <h1>Placement Questions</h1>

            <SearchingForm/>

            <div className="question-table-container">
                <table className="question-table">
                    <thead>
                        <tr>
                            <th>Question No.</th>
                            <th>Branch</th>
                            <th>Question Description</th>
                            <th>Link</th>
                            <th>Difficulty Level</th>
                            <th>Company</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>{question.questionNo}</td>
                                    <td>{question.branch}</td>
                                    <td className='question-description' onClick={() => toggleQuestionExpansion(index)}>{expandedQuestion === index ? question.description : truncateString(question.description)}</td>
                                    <td><a href={question.link}>{question.link}</a></td>
                                    <td>{question.difficulty}</td>
                                    <td>{question.company}</td>
                                    <td>{question.year}</td>
                                </tr>
                                {expandedQuestion === index && (
                                    <tr>
                                        <td colSpan="7">
                                            <div className="expanded-description" >{question.description}</div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Question;