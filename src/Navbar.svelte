<!-- https://linguinecode.com/post/create-a-navbar-in-svelte -->
<script>
  import { onMount } from 'svelte'
  import Intro from './Intro.svelte'
  import Cot from './change-over-time/Cot.svelte'
  import Correlation from './correlation/Correlation.svelte'
  import Deviation from './deviation/Deviation.svelte'
  import Distribution from './distribution/Distribution.svelte'
  import Flow from './flow/Flow.svelte'
  import Magnitude from './magnitude/Magnitude.svelte'
  import  Ptw  from './part-to-whole/Ptw.svelte'
  import Ranking from './ranking/Ranking.svelte'
  import Spatial from './spatial/Spatial.svelte'

  // show mobile
  let showMobileMenu = false

  // list of nav items
  const navItems = [
    { label: 'Visual Vocabulary', component: Intro },
    { label: 'Deviation', component: Deviation },
    { label: 'Correlation', component: Correlation },
    { label: 'Ranking', component: Ranking },
    { label: 'Distribution', component: Distribution },
    { label: 'Change over Time', component: Cot },
    { label: 'Magnitude', component: Magnitude },
    { label: 'Part-to-whole', component: Ptw },
    { label: 'Spatial', component: Spatial },
    { label: 'Flow', component: Flow }
  ]// Mobile menu click event handler
  const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

  // Media match query handler
  const mediaQueryHandler = e => {
    // Reset mobile state
    if (!e.matches) {
      showMobileMenu = false;
    }
  }

  let selected = navItems[0]

  let intSelected = 0

  function changeComponent(event) {
  	selected = navItems[event.srcElement.id];
  	intSelected = event.srcElement.id;
  }

  // Attach media query listener on mount hook
  onMount(() => {
    const mediaListener = window.matchMedia('(max-width: 767px)');

    mediaListener.addListener(mediaQueryHandler);
  });
</script>

<nav>
  <div class='inner'>
    <div on:click={handleMobileIconClick} class={`mobile-icon${showMobileMenu ? ' active' : ''}`}>
      <div class='middle-line'></div>
    </div>
    <ul class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>
      {#each navItems as item, i}
        <li>
          <a on:click={changeComponent} id={i}>{item.label}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<div>
  <h1>{selected.label}</h1>
  <!-- this is where our main content is placed -->
  <svelte:component this={selected.component}/>
</div>

<style>
  nav {
    background-color: rgba(0, 0, 0, 0.8);
    /* font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; */
    height: 45px;
  }

  .inner {
    max-width: 980px;
    padding-left: 20px;
    padding-right: 20px;
    margin: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .mobile-icon {
    width: 25px;
    height: 14px;
    position: relative;
    cursor: pointer;
  }

  .mobile-icon:after,
  .mobile-icon:before,
  .middle-line {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transition: all 0.4s;
    transform-origin: center;
  }

  .mobile-icon:before,
  .middle-line {
    top: 0;
  }

  .mobile-icon:after,
  .middle-line {
    bottom: 0;
  }

  .mobile-icon:before {
    width: 66%;
  }

  .mobile-icon:after {
    width: 33%;
  }

  .middle-line {
    margin: auto;
  }

  .mobile-icon:hover:before,
  .mobile-icon:hover:after,
  .mobile-icon.active:before,
  .mobile-icon.active:after,
  .mobile-icon.active .middle-line {
    width: 100%;
  }

  .mobile-icon.active:before,
  .mobile-icon.active:after {
    top: 50%;
    transform: rotate(-45deg);
  }

  .mobile-icon.active .middle-line {
    transform: rotate(45deg);
  }

  .navbar-list {
    display: none;
    width: 100%;
    justify-content: space-between;
    margin: 0;
    padding: 0 40px;
  }

  .navbar-list.mobile {
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: block;
    height: calc(100% - 45px);
    bottom: 0;
    left: 0;
  }

  .navbar-list li {
    list-style-type: none;
    position: relative;
  }

  .navbar-list li:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #424245;
  }

  .navbar-list a {
    color: #fff;
    text-decoration: none;
    display: flex;
    height: 45px;
    align-items: center;
    padding: 0 10px;
    font-size: 13px;
  }

  .navbar-list li:hover {
    background-color: #5c5c60;
  }



  @media only screen and (min-width: 767px) {
    .mobile-icon {
      display: none;
    }

    .navbar-list {
      display: flex;
      padding: 0;
    }

    .navbar-list a {
      display: inline-flex;
    }
  }
</style>
