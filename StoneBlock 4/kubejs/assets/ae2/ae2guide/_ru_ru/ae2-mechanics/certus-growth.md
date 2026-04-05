---
navigation:
  parent: ae2-mechanics/ae2-mechanics-index.md
  title: Выращивание кварца
  icon: quartz_cluster
---

# Выращивание кварца

## В основном просто скопировано со страницы "Начало начал"

<GameScene zoom="6" background="transparent">
<ImportStructure src="../assets/assemblies/budding_certus_1.snbt" />
</GameScene>

Бутоны истинного кварца прорастают из [цветущих блоков истинного кварца](../items-blocks-machines/budding_certus.md), так же, как и с аметистом. Если сломать бутон, который не закончил
рост, он выбросит одну <ItemLink id="certus_quartz_dust" />, на что не влияет удача. Если сломать полностью выросший кластер, то выпадет четыре
<ItemLink id="certus_quartz_crystal" />, в этом случае влияет удача.

Существует 4 типа зарождающихся истинных блоков: безупречный, потресканный, осколочный и поврежденный и Вы изначально
находите их в [метеоритах](../ae2-mechanics/meteorites.md).

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/budding_blocks.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Каждый раз, когда бутон вырастает еще на одну ступень, цветущий блок имеет шанс снизиться на один уровень, превратившись в итоге в
обычный блок истинного кварца. Их можно восстановить (и создать новые блоки), бросив бего (или блок истинного кварца)
в воду с одним или несколькими <ItemLink id="charged_certus_quartz_crystal" />.

<RecipeFor id="damaged_budding_quartz" />

Безупречные цветущие блоки не разрушаются и генерируют истинный кварц бесконечно. Однако их нельзя изготовить или переместить
киркой, даже с помощью шелкового касания. (их *можно* перемещать с помощью [пространственного хранилища](../ae2-mechanics/spatial-io.md) )

Сами по себе бутоны истинного кварца растут очень медленно. К счастью <ItemLink id="growth_accelerator" /> значительно
ускоряет этот процесс, если поместить его рядом с зарождающимся блоком. В первую очередь следует построить несколько таких блоков.

<GameScene zoom="4" background="transparent">
  <ImportStructure src="../assets/assemblies/budding_certus_2.snbt" />
  <IsometricCamera yaw="195" pitch="30" />
</GameScene>

Сложные взаимодействия означают, что каждая закрытая сторона блока-почки замедляет совокупную скорость роста от этого блока-почки,
 что в итоге перекрывает эффект от большего количества ускорителей. Эмпирические тесты показывают следующее:

![Предметов/мин для соотношений](../assets/diagrams/certus_farm_speed_chart_1.png)

![Распространённые установки](../assets/diagrams/certus_farm_speed_chart_2.png)

Если у Вас недостаточно кварца, чтобы сделать ещё и <ItemLink id="energy_acceptor" /> или <ItemLink id="vibration_chamber" />,
Вы можете сделать <ItemLink id="crank" /> и прикрепить его к концу ускорителя.

Автоматический сбор кварца [описан тут](../example-setups/simple-certus-farm.md).