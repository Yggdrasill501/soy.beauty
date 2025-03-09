interface Service {
  title: string;
  description: string;
}

export function Header({ service }: { service: Service }) {
  return (
    <div className="max-w-4xl mb-10">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-5xl font-display">
        {service.title}
      </h1>
      <p className="mt-6 text-lg text-zinc-400">{service.description}</p>
    </div>
  );
}
