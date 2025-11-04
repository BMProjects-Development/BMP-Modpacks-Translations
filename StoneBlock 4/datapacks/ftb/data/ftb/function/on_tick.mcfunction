execute as @a[predicate=ftb:fail_parkour] at @s run execute at @e[type=minecraft:marker,tag=tf_yeti_tp,limit=1,sort=nearest,distance=..128] run tp @s[gamemode=survival] ~ ~ ~ -90 0
execute as @e[type=minecraft:zombie_villager,predicate=ftb:check_villager] at @s run data modify entity @s ConversionTime set value 200
execute as @a[predicate=ftb:in_yeti,tag=!in_yeti] run tag @s add in_yeti
execute as @a[predicate=!ftb:in_yeti,tag=in_yeti] run tag @s remove in_yeti