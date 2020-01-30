import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEye } from '@fortawesome/free-solid-svg-icons';
import '../../styles/dashboard.css';

import CreatePost from '../../components/Admin/CreatePost/CreatePost.js';
import Login from '../../components/Admin/Login/Login.js';

class Dashboard extends React.Component {
  static async getInitialProps(ctx) {
    return {};
  }
  constructor() {
    super();
    this.tabInfos = [
      { name: 'Yazı Ekle', icon: faPaperPlane, component: CreatePost },
      { name: 'Yazı Düzenle', icon: faEye }
    ];

    this.state = {
      activeTab: 0,
      isLoggedIn: null,
      user: {
        name: '',
        username: '',
        imageUrl: ''
      }
    };

    this.renderDashboardMain = this.renderDashboardMain.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const decodedUser = jwtDecode(Cookies.get('token'));
    this.setState({
      isLoggedIn: true,
      user: {
        name: decodedUser.name,
        username: decodedUser.username,
        imageUrl: decodedUser.imageUrl
      }
    });
  }

  componentDidMount() {
    if (Cookies.get('token')) {
      axios
        .get('/api/auth/checktoken')
        .then(res => {
          if (res.data.success === true) {
            this.setState({ isLoggedIn: true });
            const decodedUser = jwtDecode(Cookies.get('token'));
            this.setState({
              user: {
                name: decodedUser.name,
                username: decodedUser.username,
                imageUrl: decodedUser.imageUrl
              }
            });
          } else {
            this.setState({ isLoggedIn: false });
          }
        })
        .catch(err => {
          Cookies.remove('token');
          this.setState({ isLoggedIn: false });
        });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  renderDashboardMain() {
    const Tabs = [];
    const activeTabInfo = this.tabInfos[this.state.activeTab];
    for (let i = 0; i < this.tabInfos.length; i++) {
      Tabs.push(
        <div
          key={i}
          onClick={() => this.OnTabClick(i)}
          id={this.state.activeTab == i ? 'TabActive' : ''}
          className="Tab"
        >
          <div className="Wrapper">
            <FontAwesomeIcon icon={this.tabInfos[i].icon} />
            <h1> {this.tabInfos[i].name}</h1>
          </div>
        </div>
      );
    }
    return (
      <div className="Dashboard">
        <div className="Topbar">
          <h1>Dashboard</h1>

          <div className="Profile">
            <h1>{this.state.user.name}</h1>
            <img src={this.state.user.imageUrl} />
            <svg width="21" height="21" viewBox="0 0 21 21">
              <path
                d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <div className="DashContent">
          <div className="SideNav">
            <div className="Tabs">{Tabs}</div>
          </div>
          <div className="Content">
            {activeTabInfo.component ? <activeTabInfo.component /> : null}
          </div>
        </div>
      </div>
    );
  }

  OnTabClick = index => {
    this.setState({ activeTab: index });
  };

  render() {
    if (this.state.isLoggedIn === true) {
      return this.renderDashboardMain();
    } else if (this.state.isLoggedIn === false) {
      return <Login onLogin={this.onLogin} />;
    }
    return <div></div>;
  }
}

export default Dashboard;
