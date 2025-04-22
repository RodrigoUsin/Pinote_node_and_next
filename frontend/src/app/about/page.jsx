"use client";

import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <header>
        <h2>Sobre Pinote🥜📝</h2>
      </header>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
        quis dolore voluptate soluta hic delectus illo excepturi cupiditate
        praesentium ullam. Repellat, repudiandae animi vitae quod minima
        molestias perferendis consequuntur accusamus. Eos velit quasi quidem
        incidunt? Consequuntur id, eligendi itaque ut at odio quasi deleniti
        aspernatur modi nulla ipsam incidunt nostrum mollitia reiciendis sunt
        totam ratione fugit nisi quidem alias cupiditate! Saepe aliquid, quam,
        asperiores suscipit laboriosam omnis vel totam hic, aperiam sint
        temporibus facere voluptates sed facilis doloremque. Similique
        accusantium quam reiciendis dicta sunt corrupti recusandae ducimus sed
        ipsum aperiam. Tenetur, ratione officiis ut corrupti doloremque
        blanditiis! Dicta expedita reprehenderit eaque delectus aliquam fugiat
        ipsam a, vitae nobis similique. Maxime officia vel minima officiis rem
        saepe nostrum ullam nemo sit. Sapiente ullam, aut voluptate sed esse
        dolores deserunt laboriosam tempora magnam expedita officiis repellendus
        ipsa voluptates, eum dignissimos possimus hic optio nemo in voluptatum
        sunt eos odit! Corrupti, nostrum vitae.
      </p>

      <button onClick={handleClick}>Volver a home</button>
    </>
  );
}
