---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
  title: Контроллер
  icon: controller
  position: 110
categories:
- network infrastructure
item_ids:
- ae2:controller
---

# Контроллер

<BlockImage id="controller" p:state="online" scale="8" />

Контроллер является маршрутизирующим узлом [МЭ сети](../ae2-mechanics/me-network-connections.md).
Без него сеть становится "специальной" и может иметь не более 8 использующих каналы [устройств](../ae2-mechanics/devices.md).

Невозможно иметь 2 контроллера в одной [МЭ сети](../ae2-mechanics/me-network-connections.md).

Контроллер обеспечивает 32 [канала](../ae2-mechanics/channels.md) на одну сторону.

Для работы контроллера требуется 6 AE/t на каждый блок контроллера.
 Каждый блок контроллера может хранить 8000 АЕ, поэтому для больших сетей могут потребоваться дополнительные
хранения энергии. Подробности см. в разделе [Энергия](../ae2-mechanics/energy.md).

Многоблочные контроллеры могут быть построены в достаточно свободной форме.

<GameScene zoom="2" background="transparent">
  <ImportStructure src="../assets/assemblies/controllers.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Однако есть несколько правил, которые необходимо соблюдать:

1.  Все блоки контроллеров в [МЭ сети](../ae2-mechanics/me-network-connections.md) должны быть совмещены, иначе блоки станут красными.
2.  Размер контроллера должен быть в пределах 7x7x7, иначе он будет окрашен в красный цвет.
3.  Контроллер может иметь 2 соседних блока не более чем по одной оси; если блок нарушает это правило, то он отключается и становится красным.

<GameScene zoom="2" background="transparent">
  <ImportStructure src="../assets/assemblies/controller_rules.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Если все правила соблюдены и питание подано, контроллер должен светиться и
циклически менять цвета.

Вы можете щелкнуть правой кнопкой мыши по контроллеру, чтобы получить тот же графический интерфейс, что и в <ItemLink id="network_tool" />
