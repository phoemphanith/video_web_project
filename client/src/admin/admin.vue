<template>
  <div>
    <Header />
    <Sidebar />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './templates/header';
import Sidebar from './templates/sidebar';

export default {
  name: 'Admin',
  components: {
    Header,
    Sidebar
  }
};
</script>

<style>
/* Style the side navigation */
.sidenav {
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #a7bbc7;
  transition: transform 0.4s ease-in-out;
}
.btn-sideMenu {
  display: none;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  transform: translateX(100%);
  border: none;
  background-color: rgba(231, 231, 231, 0.2);
  transition: all 0.3s ease-in-out;
}
.btn-sideMenu i {
  font-size: 2.5rem;
  color: rgba(78, 78, 78, 0.479);
}
.btn-sideMenu:hover {
  background-color: rgba(161, 161, 161, 0.5);
}
.btn-sideMenu:hover i {
  color: #333;
}

/* Side navigation links */
.sidenav a {
  color: #333;
  padding: 16px;
  text-decoration: none;
  display: block;
}

/* Change color on hover */
.sidenav a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the content */
.content {
  padding-left: 270px;
  padding-right: 20px;
  padding-top: 10px;
  margin-top: 115px;
  transition: padding 0.4s ease-in-out;
}

/* Header navbar */
.headernav {
  padding-left: 270px;
  padding-right: 20px;
  background-color: #a7bbc7;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 115px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: padding 0.4s ease-in-out;
}
@media (max-width: 1018px) {
  .sidenav {
    transform: translateX(-100%);
  }
  .sidenav.active {
    transform: translateX(0);
  }
  .btn-sideMenu {
    display: block;
  }
  .content {
    padding-left: 20px;
  }
  .headernav {
    padding-left: 20px;
  }
}
</style>
