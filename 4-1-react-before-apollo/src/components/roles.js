import './components.css';
import {gql, useQuery} from "@apollo/client";
import {useState} from "react";
import {Error, Loading, roleIcons} from "./common";

const GET_ROLES = gql`
    query GetRoles {
        roles {
            id
        }
    }
`;

const GET_ROLE = gql`
    query GetRole($id: ID!) {
        role(id: $id) {
            id
            requirement
            members {
                id
                last_name
                serve_years
            }
            equipments {
                id
            }
            softwares {
                id
            }
        }
    }
`;

function Roles() {
    const [contentId, setContentId] = useState('');

    function AsideItems() {

        const {loading, error, data} = useQuery(GET_ROLES)
        if (loading) return <Loading/>
        if (error) return <Error/>
        return (
            <ul>
                {data.roles.map(({id}) => (
                    <li key={id} className={`roleItem ${contentId === 'id' ? 'on' : ''}`} onClick={() => setContentId(id)}>
                        <span>{contentId === id ? '🌕' : '🌑'}</span>
                        {roleIcons[id]} {id}
                    </li>
                ))}
            </ul>
        )
    }

    function MainContents() {
        const {loading, error, data} = useQuery(GET_ROLE, { variables: {id: contentId} });

        if(loading) return <Loading/>
        if(error) return <Error/>
        if(contentId === '') return <div className='roleWrapper'>Select Role</div>

        return (
            <div className='roleWrapper'>
                <h2>{data.role.id}</h2>
                <div className="requirement">
                    <span>{data.role.requirement}</span>
                    required
                </div>
                <h3>Memebers</h3>
                <ul>
                    {data.role.members.map((member) => (
                        <li key={member.id}>{member.last_name}</li>
                    ))}
                </ul>
                <h3>Equipments</h3>
                <ul>
                    {data.role.equipments.map((equipment) => (
                        <li key={equipment.id}>{equipment.id}</li>
                    ))}
                </ul>
                <h3>Softwares</h3>
                <ul>
                    {data.role.softwares.map((softwares) => (
                        <li key={softwares.id}>{softwares.id}</li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div id="roles" className="component">
            <aside>
                {AsideItems()}
            </aside>
            <section className="contents">
                {MainContents()}
            </section>
        </div>
    )
}

export default Roles;
