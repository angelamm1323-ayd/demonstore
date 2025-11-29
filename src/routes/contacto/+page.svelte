<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    const socialMedia = [
        {
            name: "WhatsApp",
            url: "https://wa.me/573189746650",
            icon: "fab fa-whatsapp",
        },
        {
            name: "Instagram",
            url: "https://instagram.com/demon__store",
            icon: "fab fa-instagram",
        },
        {
            name: "TikTok",
            url: "https://tiktok.com/@demon__store",
            icon: "fab fa-tiktok",
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/profile.php?id=61576041629617",
            icon: "fab fa-facebook",
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
        </div>

        <div class="relative z-10 container mx-auto px-4 text-center">
            <h1
                class="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-red-400"
            >
                Contáctanos
            </h1>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Estamos aquí para ayudarte. ¡Visítanos o escríbenos!
            </p>
        </div>
    </section>

    <!-- Contact Info Section -->
    <section class="py-12">
        <div class="container mx-auto px-4">
            <div
                class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
                <!-- Contact Info -->
                <div
                    class="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 lg:p-12 shadow-2xl"
                    in:fly={{ x: -50, duration: 800, easing: quintOut }}
                >
                    <h2 class="text-3xl font-bold mb-8">
                        Información de Contacto
                    </h2>

                    <div class="space-y-8">
                        <div class="flex items-start">
                            <div
                                class="bg-red-900/50 p-3 rounded-xl mr-4 shrink-0"
                            >
                                <i
                                    class="fas fa-map-marker-alt text-2xl text-red-400"
                                ></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold mb-2">
                                    Ubicación
                                </h3>
                                <p class="text-gray-400">Pasto, Nariño</p>
                                <p class="text-gray-400">
                                    Cra 23 #14-38 / Calle del Colorado
                                </p>
                                <a
                                    href="https://maps.google.com?q=Pasto,Nariño,Cra 23 #14-38"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center text-red-400 hover:text-white mt-2 group transition-colors"
                                >
                                    Ver en mapa
                                    <i
                                        class="fas fa-external-link-alt ml-2 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                                    ></i>
                                </a>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <div
                                class="bg-red-900/50 p-3 rounded-xl mr-4 shrink-0"
                            >
                                <i
                                    class="fas fa-phone-alt text-2xl text-red-400"
                                ></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold mb-2">Teléfono</h3>
                                <a
                                    href="tel:+573189746650"
                                    class="text-2xl font-bold text-white hover:text-red-400 transition-colors block mb-1"
                                >
                                    318 974 6650
                                </a>
                                <p class="text-gray-400">
                                    Llámanos para más información
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <div
                                class="bg-red-900/50 p-3 rounded-xl mr-4 shrink-0"
                            >
                                <i class="far fa-clock text-2xl text-red-400"
                                ></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold mb-2">
                                    Horario de Atención
                                </h3>
                                <div class="space-y-1">
                                    <p
                                        class="text-gray-400 flex justify-between"
                                    >
                                        <span>Lunes a Sábado:</span>
                                        <span class="text-white ml-4"
                                            >9:00 AM - 7:00 PM</span
                                        >
                                    </p>
                                    <p
                                        class="text-gray-400 flex justify-between"
                                    >
                                        <span>Domingos y Festivos:</span>
                                        <span class="text-white ml-4"
                                            >10:00 AM - 4:00 PM</span
                                        >
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="pt-4 border-t border-gray-700">
                            <h3 class="text-xl font-bold mb-4">
                                Síguenos en Redes Sociales
                            </h3>
                            <div class="flex space-x-4">
                                {#each socialMedia as social}
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Síguenos en ${social.name}`}
                                        class="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/30"
                                    >
                                        <i class={social.icon}></i>
                                    </a>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map -->
                <div
                    class="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl h-full min-h-[600px]"
                    in:fly={{ x: 50, duration: 800, easing: quintOut }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.92532938962!2d-77.28248876306532!3d1.2122514167522997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed483671749ed%3A0x969dd879fabb652d!2sCra.%2023%20%23%2014-38%2C%20Pasto%2C%20Nari%C3%B1o!5e0!3m2!1ses-419!2sco!4v1762736559821!5m2!1ses-419!2sco"
                        width="100%"
                        height="100%"
                        style="border:0;"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Mapa de Demon Store"
                    ></iframe>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Contact Options -->
    <section class="py-20 bg-gray-900/50">
        <div class="container mx-auto px-4">
            <h2
                class="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-white to-red-400"
            >
                Formas de Contactarnos
            </h2>

            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            >
                {#each socialMedia as social, i}
                    <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:-translate-y-2 group"
                        in:fly={{
                            y: 50,
                            duration: 500,
                            delay: i * 100,
                            easing: quintOut,
                        }}
                    >
                        <div
                            class="bg-red-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/50 transition-colors"
                        >
                            <i
                                class="{social.icon} text-4xl text-red-400 group-hover:text-white transition-colors"
                            ></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2">{social.name}</h3>
                        <p
                            class="text-gray-400 group-hover:text-white transition-colors"
                        >
                            Chatea con nosotros
                        </p>
                    </a>
                {/each}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-linear-to-r from-red-900 to-red-800">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl md:text-5xl font-black mb-6">
                ¿Tienes alguna pregunta?
            </h2>
            <p class="text-xl mb-8 max-w-2xl mx-auto">
                No dudes en contactarnos. Estamos aquí para ayudarte
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="https://wa.me/573189746650"
                    class="px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                    <i class="fab fa-whatsapp mr-2 text-xl"></i>
                    Enviar WhatsApp
                </a>
                <a
                    href="tel:+573189746650"
                    class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-red-600 transition-colors inline-flex items-center justify-center"
                >
                    <i class="fas fa-phone-alt mr-2"></i>
                    Llamar Ahora
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
</style>
