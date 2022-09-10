import './components.css';
import {useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Error, Loading, roleIcons} from "./common";

const GET_TEAMS = gql`
    query GetTeams {
        teams {
            id
            manager
            members {
                id
                first_name
                last_name
                role
            }
        }
    }
`;

const GET_TEAM = gql`
    query GetTeam($id: ID!) {
        team(id: $id) {
            id
            manager
            office
            extension_number
            mascot
            cleaning_duty
            project
        }
    }
`;

const DELETE_TEAM = gql`
    mutation DeleteTeam($id: ID!) {
        deleteTeam(id: $id) {
            id
        }
    }
`;

function Teams() {
    const [contentId, setContentId] = useState(0);
    const [inputs, setInputs] = useState({
        manager: '', office: '', extension_number: '', mascot: '', cleaning_duty: '', project: ''
    })

    function AsideItems() {
        const {loading, error, data} = useQuery(GET_TEAMS);

        if (loading) return <Loading/>
        if (error) return <Error/>

        return (
            <ul>
                {data.teams.map(({id, manager, members}) => (
                    <li key={id}>
                        <span className='teamItemTitle' onClick={() => setContentId(Number(id))}>
                            Team {id} : {manager}'s
                        </span>
                        <ul className='teamMembers'>
                            {members.map(({id, first_name, last_name, role}) => (
                                <li key={id}>
                                    {roleIcons[role]} {first_name} {last_name}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        )
    }

    function MainContents() {
        const {loading, error, data} = useQuery(GET_TEAM, {
            variables: {id: contentId},
            onCompleted: (data) => {
                if (contentId === 0) {
                    setInputs({
                        manager: '',
                        office: '',
                        extension_number: '',
                        mascot: '',
                        cleaning_duty: '',
                        project: ''
                    })
                } else {
                    setInputs({
                        manager: data.team.manager,
                        office: data.team.office,
                        extension_number: data.team.extension_number,
                        mascot: data.team.mascot,
                        cleaning_duty: data.team.cleaning_duty,
                        project: data.team.project
                    })
                }
            }
        });

        if (loading) return <Loading/>
        if (error) return <Error/>

        function handleChange(e) {
            const {name, value} = e.target;
            setInputs({...inputs, [name]: value})
        }


        function execDeleteTeam() {
            if (window.confirm('you want delete this item')) {
                deleteTeam({variables: {id: contentId}})
            }
        }

        const [deleteTeam] = useMutation(DELETE_TEAM, {onCompleted: deleteTeamCompleted})

        function deleteTeamCompleted(data) {
            console.log(data.deleteTeam);
            alert(`${data.deleteTeam.id} is deleted`);
            setContentId(0)
        }

        return (
            <div className="inputContainer">
                <table>
                    <tbody>
                    {contentId !== 0 && (
                        <tr>
                            <td>Id</td>
                            <td>{contentId}</td>
                        </tr>
                    )}
                    <tr>
                        <td>Manager</td>
                        <td><input type="text" name="manager" value={inputs.manager} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Office</td>
                        <td><input type="text" name="office" value={inputs.office} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Extension Number</td>
                        <td><input type="text" name="extension_number" value={inputs.extension_number}
                                   onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Mascot</td>
                        <td><input type="text" name="mascot" value={inputs.mascot} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Cleaning Duty</td>
                        <td><input type="text" name="cleaning_duty" value={inputs.cleaning_duty}
                                   onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Project</td>
                        <td><input type="text" name="project" value={inputs.project} onChange={handleChange}/></td>
                    </tr>
                    </tbody>
                </table>
                {contentId === 0 ?
                    (<div className="buttons">
                            <button onClick={() => {
                            }}>Submit
                            </button>
                        </div>
                    ) : (
                        <div className="buttons">
                            <button onClick={() => {
                            }}>Modify
                            </button>
                            <button onClick={execDeleteTeam}>Delete</button>
                            <button onClick={() => {
                                setContentId(0)
                            }}>New
                            </button>
                        </div>
                    )}
            </div>
        )
    }

    return (
        <div id="teams" className="component">
            <aside>
                {AsideItems()}
            </aside>
            <section className="contents">
                {MainContents()}
            </section>
        </div>
    )
}

export default Teams;
