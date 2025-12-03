<script>
    export let searchTerm = "";
</script>

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
            class="text-5xl md:text-8xl mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-red-400 demon-font font-normal"
        >
            Nuestro Catalogo
        </h1>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            Descubre nuestra exclusiva colección de prendas seleccionadas con
            estilo
        </p>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
            <div class="relative">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    bind:value={searchTerm}
                    class="w-full px-6 py-4 rounded-full bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 pl-12"
                />
                <i
                    class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                ></i>
            </div>
        </div>
    </div>
</section>

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
