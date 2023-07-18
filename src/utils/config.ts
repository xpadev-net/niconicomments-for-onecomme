import {
  $any,
  $array,
  $enum,
  $object,
  $opt,
  $record,
  $string,
  $union,
  access,
  Infer,
} from "lizod";

const operator = $enum(["equal", "moreThan", "moreEqual", "lessThan", "lessEqual"]);

const condition = $object({
  object: $string,
  operator: $opt(operator),
  value: $any,
});

const replaceMap = $record($string, $string);

const validate = $object({
  commands: $array(
    $object({
      condition: $union([$array(condition), condition]),
      content: $string,
    })
  ),
  defaultCommand: $string,
  replace: replaceMap,
});

export type TConfig = Infer<typeof validate>;
export type TCondition = Infer<typeof condition>;
export type TReplaceMap = Infer<typeof replaceMap>;

export let config: TConfig;

const getConfig = async () => {
  const req = await fetch("./config.json");
  const data = (await req.json()) as unknown;
  const ctx = { errors: [] };
  if (!validate(data, ctx)) {
    document.body.innerHTML = "";
    for (const errorPath of ctx.errors) {
      const msg = document.createElement("div");
      msg.style.backgroundColor = "rgba(255,0,0,0.5)";
      msg.innerHTML = `[invalid config] error at ${errorPath} ${access(
        data,
        errorPath
      )}`;
      document.body.append(msg);
    }
    throw new Error();
  }
  config = data;
};

export const initConfig = getConfig();
