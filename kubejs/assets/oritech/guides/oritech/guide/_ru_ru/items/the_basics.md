---
navigation:
  title: Основы
  position: 1
  icon: "oritech:accelerator_ring"
  parent: oritech:getting_started.md
item_ids:
  - oritech:accelerator_ring
  - oritech:accelerator_motor
  - oritechthings:accelerator_magnetic_field
---
# Основы

<Column alignItems="center" fullWidth={true}>
### <ItemImage id="oritech:accelerator_controller" scale="0.75" /> <Color id="aqua">Основы</Color> <ItemImage id="oritech:accelerator_controller" scale="0.75" />

<GameScene zoom="2.5" interactive={true}>
  <ImportStructure src="oritech:assets/basic_accelerator.nbt" />
  <IsometricCamera yaw="225" pitch="30" />
  <DiamondAnnotation pos="0.5 0.5 1.5" color="#ff6d6dff">
  Каждая установка требует 2 ускорителя частиц. Используется для вставки предметов для ускорения. <ItemImage id="oritech:accelerator_controller" />
  </DiamondAnnotation>
  <DiamondAnnotation pos="3.5 0.5 2.5" color="#ff6d6dff">
  Магнитное поле ускорителя размещается в центре и связывается с главным ускорителем частиц с помощью продвинутого целеуказателя.
  
  Они также поддерживают улучшения! <ItemImage id="oritechthings:accelerator_magnetic_field" />
  </DiamondAnnotation>
  <DiamondAnnotation pos="5.5 0.5 2.5" color="#ff6d6dff">
  Линейный двигатель размещается внутри кольца ускорителя. При подаче питания он будет ускорять частицу. <ItemImage id="oritech:accelerator_motor" />
  </DiamondAnnotation>
  <DiamondAnnotation pos="2.5 0.5 4.5" color="#ff6d6dff">
  Кольца ускорителя частиц помогают направлять частицу по кольцу. После установки их можно нажать ПКМ, чтобы изменить угол входа. <ItemImage id="oritech:accelerator_ring" />
  </DiamondAnnotation>
</GameScene>

#### *Базовая установка ускорителя частиц*
</Column>

---

Для настройки <Color id="aqua">ускорителя частиц</Color>, Вам понадобятся следующие предметы::

<ItemGrid>
  <ItemIcon id="oritech:accelerator_motor" />
  <ItemIcon id="oritech:accelerator_controller" />
  <ItemIcon id="oritech:accelerator_ring" />
  <ItemIcon id="oritechthings:accelerator_magnetic_field" />
  <ItemIcon id="oritechthings:advanced_target_designator" />
</ItemGrid>

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritech:accelerator_controller" />
</Column>

<Color id="aqua">Ускорители частиц</Color> - это главные машины в любой структуре ускорителя. Сюда будут вставляться предметы для запуска в кольцо ускорения частиц. Базовая установка требует как минимум 2 <Color id="aqua">ускорителей частиц</Color>, оба присоединённые к <Color id="green">кольцу ускорителя частиц</Color>.

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritech:accelerator_ring" />
</Column>
<Color id="green">Кольца ускорителя частиц</Color> используются для направления частицы по кругу. После установки на них можно нажать ПКМ, чтобы изменить угол входа. В зависимости от размера кольца Вам потребуется больше таких колец.

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritech:accelerator_motor" />
</Column>
<Color id="green">Линейный двигатель</Color> используется для разгона частиц по кольцу. Они должны получать питание. Хотя требуется только 1 двигатель, наличие большего количества ускорит разгон частицы.

---

<Column alignItems="center" fullWidth={true}>
<ItemImage scale="3" id="oritechthings:accelerator_magnetic_field" />
</Column>
<Color id="gold">Магнитное поле ускорителя</Color> размещается в центре установки и связывается с главным ускорителем частиц через нажатие Shift + ПКМ с <Color id="aqua">продвинутым целеуказателем</Color>, а затем Shift + ПКМ по магнитному полю.

Магнит также очень энергозатратен. Вы можете присоединять улучшения или расширители улучшений машин, что необходимо для достижения 15 кДж на небольших кольцах.

---

Рекомендуемые улучшения для магнитного поля:

<ItemGrid>
  <ItemIcon id="oritechthings:addon_block_efficient_speed_tier_8" />
  <ItemIcon id="oritechthings:addon_block_capacitor_tier_8" />
</ItemGrid>

*Примечание: Эта небольшая установка также может достичь 15 кДж с использованием расширителя улучшений машин и нескольких вышеуказанных улучшений.*



