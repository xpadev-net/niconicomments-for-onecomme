import { CommonData } from "@/@types/comments";
import { config, TCondition } from "@/utils/config";

const applyCommands = (comment: CommonData) => {
  const commands: string[] = config.defaultCommand.split(/\s+/);
  for (const item of config.commands) {
    let result = true;
    if (Array.isArray(item.condition)) {
      for (const condition of item.condition) {
        result &&= processCondition(comment, condition);
      }
    } else {
      result &&= processCondition(comment, item.condition);
    }
    if (result) {
      commands.push(...item.content.split(/\s+/));
    }
  }
  return commands;
};

const processCondition = (
  comment: { [key: string]: unknown },
  condition: TCondition
) => {
  if (condition.operator === "notEqual") {
    return getConditionValue(comment, condition) != condition.value;
  }
  if (condition.operator === "moreThan") {
    return getConditionValue(comment, condition) > condition.value;
  }
  if (condition.operator === "moreEqual") {
    return getConditionValue(comment, condition) >= condition.value;
  }
  if (condition.operator === "lessThan") {
    return getConditionValue(comment, condition) < condition.value;
  }
  if (condition.operator === "lessEqual") {
    return getConditionValue(comment, condition) <= condition.value;
  }
  return getConditionValue(comment, condition) == condition.value;
};

const getConditionValue = (
  comment: { [key: string]: unknown },
  condition: TCondition
) => {
  try {
    let result = comment as { [key: string]: unknown };
    const keys = condition.object.split(".");
    for (const key of keys) {
      result = result[key] as { [key: string]: unknown };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result as any;
  } catch (_) {
    return;
  }
};

export { applyCommands };
