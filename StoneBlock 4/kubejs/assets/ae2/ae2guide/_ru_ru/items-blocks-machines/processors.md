---
navigation:
  parent: items-blocks-machines/items-blocks-machines-index.md
  title: Процессоры
  icon: logic_processor
  position: 010
categories:
- misc ingredients blocks
item_ids:
- ae2:logic_processor
- ae2:calculation_processor
- ae2:engineering_processor
- ae2:printed_silicon
- ae2:printed_logic_processor
- ae2:printed_calculation_processor
- ae2:printed_engineering_processor
- ae2:silicon
---

# Процессоры

<Row>
  <ItemImage id="logic_processor" scale="4" />

  <ItemImage id="calculation_processor" scale="4" />

  <ItemImage id="engineering_processor" scale="4" />
</Row>

Процессоры - одна из основных составляющих AE2 [устройств](../ae2-mechanics/devices.md) и машин. Они также являются одной из первых больших задач автоматизации. 

Существует три типа процессоров:
- **Логический процессор** (изготовленных из золота)  
- **Вычислительный процессор** (изготовленных из <ItemLink id="certus_quartz_crystal" />)  
- **Инженерный процессор** (изготовленных из алмаза)  

## Этапы производства

В стандартном опыте игры в AE2, процессоры создаются с помощью [прессов](presses.md) и <ItemLink id="inscriber" /> в несколько этапов.  

Однако в этой сборке **прессы и высекатели не используются**. Весь крафт процессоров был объединён в мульблочную структуру **создатель схем**.  
Эта структура обрабатывает полный цикл производства процессоров — от "напечатанных" компонентов до готовых процессоров — без необходимости в прессах.

## Требования

- **Создатель схем** должен быть собран и активен.    
- <ItemLink id="mysterious_cube" /> требуется для работы структуры.  
- Рецепты можно посмотреть через **JEI** - там будут указаны необходимые ингредиенты для каждого типа процессора.
