<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    const values = [
        {
            icon: "fa-star",
            title: "Calidad",
            description:
                "Productos cuidadosamente seleccionados para garantizar la mejor experiencia",
        },
        {
            icon: "fa-heart",
            title: "Pasión",
            description:
                "Amamos lo que hacemos y se refleja en cada prenda que ofrecemos",
        },
        {
            icon: "fa-users",
            title: "Comunidad",
            description:
                "Construimos relaciones duraderas con nuestros clientes",
        },
        {
            icon: "fa-bolt",
            title: "Innovación",
            description: "Siempre buscando las últimas tendencias para ti",
        },
    ];
</script>

<main class="min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <div
                class="absolute top-1/4 -left-20 w-96 h-96 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            ></div>
            <div
                class="absolute top-1/2 -right-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
            ></div>
            <div
                class="absolute bottom-1/4 left-1/2 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
            ></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 text-center">
            <div
                class="inline-block mb-8 overflow-hidden rounded-full border-red-600 border-4 bg-black"
                in:fly={{ y: -50, duration: 1000, easing: quintOut }}
            >
                <img
                    src="/logo-cropped-2.svg"
                    alt="Demon Store Logo"
                    class="h-32 w-32 object-contain rounded-full p-1"
                />
            </div>

            <h1
                class="text-5xl md:text-8xl mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-red-400 demon-font font-normal"
                in:fly={{ y: 50, duration: 1000, delay: 200, easing: quintOut }}
            >
                Sobre Demon Store
            </h1>
            <p
                class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light"
                in:fly={{ y: 50, duration: 1000, delay: 400, easing: quintOut }}
            >
                Más que una tienda de ropa, somos un destino de estilo. Desde
                nuestros inicios en Pasto, Nariño, nos hemos dedicado a ofrecer
                prendas que reflejan personalidad y autenticidad.
            </p>
        </div>
    </section>

    <!-- Our Story -->
    <section class="py-20 bg-gray-900/50">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <h2
                    class="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-linear-to-r from-white to-red-400"
                >
                    Nuestra Historia
                </h2>

                <div
                    class="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl"
                >
                    <div class="space-y-6 text-gray-300 leading-relaxed">
                        <p class="text-lg">
                            <span class="text-red-400 font-bold text-2xl"
                                >D</span
                            >emon Store nació con una visión clara:
                            <span class="text-white font-semibold"
                                >revolucionar la forma en que las personas
                                experimentan la moda</span
                            >. No solo vendemos ropa, vendemos una actitud, un
                            estilo de vida.
                        </p>

                        <p>
                            En el corazón de <span
                                class="text-red-400 font-semibold"
                                >Pasto, Nariño</span
                            >, encontramos nuestra inspiración en la diversidad
                            cultural y la pasión de nuestra gente. Cada prenda
                            que ofrecemos ha sido seleccionada pensando en la
                            personalidad única de nuestros clientes.
                        </p>

                        <p>
                            Nuestro compromiso va más allá de las tendencias
                            pasajeras. Nos enfocamos en
                            <span class="text-white font-semibold"
                                >calidad, autenticidad y servicio excepcional</span
                            >. Cada cliente que visita Demon Store no es solo
                            una transacción, es parte de nuestra familia.
                        </p>

                        <div
                            class="bg-red-900/20 border-l-4 border-red-600 p-6 rounded-r-lg mt-8"
                        >
                            <p class="text-xl italic text-red-300">
                                "Además de venderte ropa, te vendemos estilo"
                            </p>
                            <p class="text-sm text-gray-400 mt-2">
                                - Nuestro lema
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Values Section -->
    <section class="py-20">
        <div class="container mx-auto px-4">
            <h2
                class="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-white to-red-400"
            >
                Nuestros Valores
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {#each values as value, i}
                    <div
                        class="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:-translate-y-2"
                        in:fly={{
                            y: 50,
                            duration: 500,
                            delay: i * 100,
                            easing: quintOut,
                        }}
                    >
                        <div
                            class="bg-red-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <i class="fas {value.icon} text-4xl text-red-400"
                            ></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4">{value.title}</h3>
                        <p class="text-gray-400">{value.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gray-900/50">
        <div class="container mx-auto px-4">
            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
                <div class="text-center">
                    <div class="text-5xl font-black text-red-400 mb-2">
                        100+
                    </div>
                    <p class="text-gray-400">Productos Exclusivos</p>
                </div>
                <div class="text-center">
                    <div class="text-5xl font-black text-red-400 mb-2">
                        500+
                    </div>
                    <p class="text-gray-400">Clientes Satisfechos</p>
                </div>
                <div class="text-center">
                    <div class="text-5xl font-black text-red-400 mb-2">5★</div>
                    <p class="text-gray-400">Calificación Promedio</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-linear-to-r from-red-900 to-red-800">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl md:text-5xl font-black mb-6">
                ¿Listo para descubrir tu estilo?
            </h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto">
                Visita nuestra tienda o explora nuestro catálogo en línea
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="/catalogo"
                    class="px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
                >
                    <i class="fas fa-shopping-bag mr-2"></i>
                    Ver Catálogo
                </a>
                <a
                    href="https://wa.me/573189746650"
                    class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-red-600 transition-colors"
                >
                    <i class="fab fa-whatsapp mr-2"></i>
                    Contáctanos
                </a>
            </div>
        </div>
    </section>
</main>

<style>
    @keyframes blob {
        0%,
        100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
    }

    .animate-blob {
        animation: blob 7s infinite;
    }

    .animation-delay-2000 {
        animation-delay: 2s;
    }

    .animation-delay-4000 {
        animation-delay: 4s;
    }
</style>
