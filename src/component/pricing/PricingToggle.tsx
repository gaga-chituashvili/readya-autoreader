import { useTranslation } from "react-i18next";
import { Button } from "@/component/ui/button";

type Props = {
  active: string;
  onChange: (value: string) => void;
};

const options = ["monthly", "quarterly", "yearly"];

export const PricingToggle = ({ active, onChange }: Props) => {
  const { t } = useTranslation("pricing");

  return (
    <section className="flex justify-center mt-8 px-4">
      <div
        className="
          w-full max-w-md
          bg-gray-200 dark:bg-zinc-800
          rounded-full p-1
          flex
        "
      >
        {options.map((opt, index) => (
          <Button
            key={index}
            onClick={() => onChange(opt)}
            variant={active === opt ? "toggleActive" : "toggle"}
            size="toggle"
          >
            {t(`plans_labels.${opt}`)}
          </Button>
        ))}
      </div>
    </section>
  );
};
