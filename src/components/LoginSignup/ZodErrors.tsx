import classes from "./ZodErrors.module.css";

export function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div key={index} className={classes.error}>
      {err}
    </div>
  ));
}