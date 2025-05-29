import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import './SideBar.scss';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { GiAncientRuins } from "react-icons/gi";
import { GiAngelOutfit } from "react-icons/gi";
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;


    const accountRedux = useSelector(state => state.userInfo.account);
    const [account, setAccount] = useState(accountRedux);

    useEffect(() => {

        setAccount(accountRedux);
    }, [])
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <GiAncientRuins size={'3em'} color={"00bfff"} />
                        <NavLink to="/" className='nav-link'>
                            <span className='link-home'>
                                Alex Nguyễn

                            </span>


                        </NavLink>

                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<GiAngelOutfit />}
                            suffix={<span className="badge red">New</span>}
                        >
                            <Link to='/admins'> Dashboard</Link>


                        </MenuItem>

                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaRegLaughWink />}
                            title="Features"
                        >

                            {/* {account.roleId === 'R1' && ( */}
                            <>
                                <MenuItem>  <Link to="manage-user">Manage User</Link></MenuItem>
                                <MenuItem> <Link to="manage-doctor">Manage Doctor</Link> </MenuItem>
                                <MenuItem> <Link to="manage-clinic" >Manage CLinic</Link></MenuItem>
                                <MenuItem> <Link to="manage-specilaty" >Manage Specialty</Link></MenuItem>
                                <MenuItem> <Link to="manage-schedule" >Manage Schedule</Link> </MenuItem>
                            </>
                            {/* )} */}
                            {account.roleId === 'R2' && (
                                <>
                                    <MenuItem> <Link to="manage-patient" >Manage Patient</Link> </MenuItem>
                                    <MenuItem> <Link to="manage-history" >Manage history Patient</Link> </MenuItem>
                                    <MenuItem> <Link to="manage-rexam" >Manage Rexam </Link> </MenuItem>
                                </>
                            )}
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/AlexanderIII-3/react-hook"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                viewSource
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;