import { $any, $array, $object, $string, access, Infer } from "lizod";

const condition = $object({
  object: $string,
  value: $any,
});

const validate = $object({
  commands: $array(
    $object({
      condition: condition,
      content: $string,
    })
  ),
  defaultCommand: $string,
});

export type TConfig = Infer<typeof validate>;
export type TCondition = Infer<typeof condition>;

const getConfig = async (): Promise<TConfig> => {
  const req = await fetch("./config.json");
  const config = (await req.json()) as unknown;
  const ctx = { errors: [] };
  if (!validate(config, ctx)) {
    document.body.innerHTML = "";
    for (const errorPath of ctx.errors) {
      const msg = document.createElement("div");
      msg.style.backgroundColor = "rgba(255,0,0,0.5)";
      msg.innerHTML = `[invalid config] error at ${errorPath} ${access(
        config,
        errorPath
      )}`;
      document.body.append(msg);
    }
    throw new Error();
  }
  return config;
};

export { getConfig };
