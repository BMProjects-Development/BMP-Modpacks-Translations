'use strict';

BlockEvents.rightClicked("malum:spirit_jar", (event) => {
  const { player, level, item } = event;
  if (!player) return;
  if (level.isClientSide()) return;
  if (String(item.id) !== "malum:ravenous_pouch") return;

  const contents = item.get("malum:ravenous_pouch_data");
  if (!contents) return;

  let isEmpty = true;
  try {
    if (typeof contents.isEmpty === "function") {
      isEmpty = contents.isEmpty();
    } else if (contents.items && typeof contents.items.size === "function") {
      isEmpty = contents.items.size() === 0;
    } else if (contents.items && contents.items.length !== undefined) {
      isEmpty = contents.items.length === 0;
    }
  } catch (e) {}

  if (isEmpty) return;

  event.cancel();
  player.tell(Text.translate("ftb.malum.ravenous_pouch_jar_denied").red());
});
