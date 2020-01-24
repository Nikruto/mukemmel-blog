import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEye } from '@fortawesome/free-solid-svg-icons';
import '../../styles/dashboard.css';

import CreatePost from '../../components/Admin/CreatePost/CreatePost.js';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.tabInfos = [
      { name: 'Yazı Ekle', icon: faPaperPlane, component: CreatePost },
      { name: 'Yazı Düzenle', icon: faEye }
    ];
    this.state = {
      activeTab: 0
    };
  }

  OnTabClick = index => {
    this.setState({ activeTab: index });
  };

  render() {
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
            <h1>Selman</h1>
            <img src="https://miro.medium.com/fit/c/256/256/0*T6W6eLyoKpAmDnKy.jpg" />
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
}

export default Dashboard;
