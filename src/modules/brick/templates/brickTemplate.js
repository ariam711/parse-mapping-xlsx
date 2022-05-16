const brickTemplate = `
<div class='header-menu-wrapper custom-menu'>
  <div class='menu-item has-submenu'>
    <div class='menu-title'><a>Rugs</a></div>
    <div class='menu-content-wrap'>
      <div class='menu-content'>
        <div class='menu-content-item has-modile-submenu'>
          <div class='menu-content-item-header'>Shop By Style</div>
          <div class='menu-content-item-submenu'>
            <div class='submenu-item'>
              <ol>
                <li><a href="{{store url='area-rugs/rug-styles/casual-rugs'}}">Casual Rugs</a></li>
                <li><a href="{{store url='area-rugs/rug-styles/contemporary-rugs'}}">Contemporary Rugs</a></li>
                <li><a href="{{store url='area-rugs/rug-styles/traditional-rugs'}}">Traditional Rugs</a></li>
                <li><a href="{{store url='area-rugs/rug-styles/transitional-rugs'}}">Transitional Rugs</a></li>
                <li><a href="{{store url='area-rugs/rug-styles/kids-rugs'}}">Rugs for Kids</a></li>
                <li><a href="{{store url='area-rugs/rug-styles/outdoor-rugs'}}">Rugs for Outdoors</a></li>
                <li class='all'><a href="{{store url='area-rugs/rug-styles'}}">All Styles</a></li>
              </ol>
            </div>
          </div>
        </div>
        <div class='menu-content-item has-modile-submenu'>
          <div class='menu-content-item-header'>Shop By Pattern</div>
          <div class='menu-content-item-submenu'>
            <div class='submenu-item'>
              <ol>
                <li><a href="{{store url='area-rugs/rug-patterns/abstract-rugs'}}">Abstract Rugs</a></li>
                <li><a href="{{store url='area-rugs/rug-patterns/distressed-rugs'}}">Distressed Rugs</a></li>
                <li><a href="{{store url='area-rugs/rug-patterns/geometric-rugs'}}">Geometric Rugs</a></li>
                <li><a href="{{store url='area-rugs/rug-patterns/shag-rugs'}}">Shag Rugs</a></li>
                <li><a href="{{store url='area-rugs/rug-patterns/solid-rugs'}}">Solid Rugs</a></li>
                <li><a href="{{store url='area-rugs/rug-patterns/sports-rugs'}}">Sports Rugs</a></li>
                <li class='all'><a href="{{store url='area-rugs/rug-patterns'}}">All Patterns</a></li>
              </ol>
            </div>
          </div>
        </div>
        <div class='menu-content-item has-modile-submenu'>
          <div class='menu-content-item-header'>Shop By Color</div>
          <div class='menu-content-item-submenu submenu-with-icon'>
            <div class='submenu-item'>
              <ol>
                <li><a class='icon color-beige' href="{{store url='area-rugs/rug-colors/beige-rugs'}}">Beige</a></li>
                <li><a class='icon color-black' href="{{store url='area-rugs/rug-colors/black-rugs'}}">Black</a></li>
                <li><a class='icon color-blue' href="{{store url='area-rugs/rug-colors/blue-rugs'}}">Blue</a></li>
                <li><a class='icon color-gray' href="{{store url='area-rugs/rug-colors/gray-rugs'}}">Gray</a></li>
                <li><a class='icon color-multi' href="{{store url='area-rugs/rug-colors/multicolor-rugs'}}">Multi
                  Color</a></li>
                <li><a class='icon color-red' href="{{store url='area-rugs/rug-colors/red-rugs'}}">Red</a></li>
                <li><a class='icon color-pink' href="{{store url='area-rugs/rug-colors/pink-rugs'}}">Pink</a></li>
                <li class='all'><a href="{{store url='area-rugs/rug-colors'}}">All Colors</a></li>
              </ol>
            </div>
          </div>
        </div>
        <div class='menu-content-item has-modile-submenu'>
          <div class='menu-content-item-header'>Shop By Brand</div>
          <div class='menu-content-item-submenu'>
            <div class='submenu-item'>
              <ol>
                <li><a href="{{store url='area-rugs/rug-brands/karastan'}}">Karastan</a></li>
                <li><a href="{{store url='area-rugs/rug-brands/loloi'}}">Loloi</a></li>
                <li><a href="{{store url='area-rugs/rug-brands/nourison'}}">Nourison</a></li>
                <li><a href="{{store url='area-rugs/rug-brands/oriental-weavers'}}">Oriental Weavers</a></li>
                <li><a href="{{store url='area-rugs/rug-brands/surya'}}">Surya</a></li>
                <li><a href="{{store url='area-rugs/rug-brands/united-weavers'}}">United Weavers</a></li>
                <li class='all'><a href="{{store url='area-rugs/rug-brands'}}">All Brands</a></li>
              </ol>
            </div>
          </div>
        </div>
        <div class='menu-content-item'>
          <div class='item-image-wrap'>
            <a href="{{store url=''}}"> <img src='{{media url=wysiwyg/comman/fall-sale-banner.jpg}}' alt='' /> </a>
          </div>
        </div>
      </div>
      <div class='menu-bottom-content'>
        <div class='menu-bottom-item'>
          <a href="{{store url='area-rugs'}}">Shop All Rugs</a>
        </div>
      </div>
    </div>
  </div>

  {{category1}}

  <div class="menu-item has-submenu">
    <div class="menu-title"><a>Appliances</a></div>
    <div class="menu-content-wrap">
      <div class="menu-content">
        <div class="menu-content-item has-modile-submenu">
          <div class="menu-content-item-header">Appliances</div>
          <div class="menu-content-item-submenu">
            <div class="submenu-item">
              <ol>
                <li><a href="{{store url='appliances/cooling-air-quality'}}">Cooling &amp; Air Quality</a>
                  <ol>
                    <li><a href="{{store url=''}}appliances/cooling-air-quality/dehumidifiers/">Dehumidifiers</a></li>
                    <li><a href="{{store url=''}}appliances/cooling-air-quality/window-air-conditioners/">Window Air Conditioners</a></li>
                  </ol>
                </li>
                <li><a href="{{store url='appliances/freezers-ice-makers'}}">Freezers &amp; Ice Makers</a>
                  <ol>
                    <li><a href="{{store url=''}}appliances/freezers-ice-makers/chest-freezer/">Chest Freezers</a></li>
                    <li><a href="{{store url=''}}appliances/freezers-ice-makers/upright-freezers/">Upright Freezers</a></li>
                  </ol>
                </li>
                <li><a href="{{store url='appliances/refrigerators'}}">Refrigerators</a>
                  <ol>
                    <li><a href="{{store url=''}}appliances/refrigerators/compact-refrigerators/">Compact Refrigerators</a></li>
                    <li><a href="{{store url=''}}appliances/refrigerators/top-freezer-refrigerators/">Top Freezer Refrigerators</a></li>
                  </ol>
                </li>
              </ol>
            </div>
          </div>
        </div>

      </div>
      <div class='menu-bottom-content'>
        <div class='menu-bottom-item'><a href="{{store url='appliances'}}">Shop All Appliances</a></div>
      </div>
    </div>
  </div>

  <div class='menu-item'>
    <div class='menu-title'><a href="{{store url='room-visualizer'}}">Room Viewer</a></div>
  </div>
  <div class='menu-item'>
    <div class='menu-title'><a href="{{store url='area-rugs-closeout'}}">Close Out</a></div>
  </div>
</div>
`;

export default brickTemplate;
