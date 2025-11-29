<script>
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { onMount } from "svelte";
    import { collection, getDocs, query, orderBy } from "firebase/firestore";
    import { db } from "$lib/js/firebase";

    let categories = [];
    let isLoading = true;
    let error = null;

    // Fetch categories from Firestore
    onMount(async () => {
        try {
            const categoriesCollection = collection(db, "categorias");
            const q = query(categoriesCollection, orderBy("nombre"));
            const snapshot = await getDocs(q);
            categories = snapshot.docs.map((doc) => ({
                docId: doc.id,
                ...doc.data(),
            }));
        } catch (err) {
            console.error("Error fetching categories:", err);
            error =
                "Error al cargar las categorías. Por favor, intenta de nuevo más tarde.";
        } finally {
            isLoading = false;
        }
    });
</script>

<main
    class="min-h-screen bg-linear-to-br from-gray-900 to-black text-white overflow-x-hidden relative"
>
    <!-- Hero Section -->
    <section
        class="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
        <div class="absolute inset-0 z-0">
            <!-- Logo como fondo con opacidad -->
            <div
                class="absolute inset-0 bg-[url('/logo.svg')] bg-cover bg-center opacity-9"
            ></div>
            <!-- Overlay oscuro para mejorar legibilidad -->
            <div class="absolute inset-0 bg-black/40"></div>
            <!-- Efectos decorativos -->
            <div
                class="absolute top-1/4 -left-20 w-96 h-96 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
            ></div>
            <div
                class="absolute top-1/2 -right-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"
            ></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 text-center">
            <div class="flex h-100 flex-col justify-between items-center">
                <div>
                    <h1
                        class="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-red-400"
                    >
                        DEMON STORE
                    </h1>

                    <p
                        class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
                    >
                        "Además de venderte ropa, te vendemos estilo"
                    </p>
                </div>
                <div
                    class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
                >
                    <a
                        href="/catalogo"
                        class="relative px-8 py-4 bg-linear-to-r from-red-600 to-red-800 text-white font-bold rounded-full overflow-hidden group"
                    >
                        <span class="relative z-10">Explorar Catálogo</span>
                        <span
                            class="absolute inset-0 bg-linear-to-r from-red-700 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        ></span>
                    </a>

                    <a
                        href="/contacto"
                        class="px-8 py-4 border-2 border-red-600 text-red-400 hover:bg-red-900/30 font-bold rounded-full transition-colors duration-300"
                    >
                        Contáctanos
                    </a>
                </div>
                <div class="">
                    <a
                        href="#catalogo-preview"
                        class="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
                        aria-label="Desplazarse hacia abajo"
                    >
                        <span class="text-sm mb-2">Ver más</span>
                        <i class="fas fa-chevron-down animate-bounce"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Preview Section -->
    <section
        id="catalogo-preview"
        class="py-16 sm:py-20 bg-linear-to-b from-gray-900 to-black relative overflow-hidden"
    >
        <!-- Decorative elements -->
        <div
            class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10"
        >
            <div
                class="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0dGVybiBpZD0icGF0dGVybi1iYXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFucz9ybT0icm90YXRlKDEzNSkiPjxyZWN0IGlkPSJwYXR0ZXJuLWJnIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggaWQ9InBhdHRlcm4tZmciIGQ9Ik0wIDBoMjB2MjBIMHpNMjAgMjBoMjB2MjBIMjB6TTIwIDQwaDIwdjIwSDIwek0wIDQwaDIwdjIwSDB6TTAgMjBoMjB2MjBIMHoiIGZpbGw9IiNlMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybi1iYXNlKSIvPjwvc3ZnPg==')]"
            ></div>
        </div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="text-center mb-20">
                <h2
                    class="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-red-400 inline-block"
                >
                    Nuestros Productos
                </h2>
                <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                    Descubre nuestra exclusiva colección de prendas
                    seleccionadas para ti
                </p>
            </div>

            {#if error}
                <div class="col-span-full text-center py-10">
                    <p class="text-red-400">{error}</p>
                    <button
                        class="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors"
                        on:click={() => window.location.reload()}
                    >
                        Reintentar
                    </button>
                </div>
            {:else if isLoading}
                <div class="col-span-full flex justify-center py-20">
                    <div
                        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
                    ></div>
                </div>
            {:else if categories.length === 0}
                <div class="col-span-full text-center py-10">
                    <p class="text-gray-400">
                        No hay categorías disponibles en este momento.
                    </p>
                </div>
            {:else}
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 w-full"
                >
                    {#each categories as category, i}
                        <article
                            class="group relative bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
                            in:fly={{
                                y: 50,
                                duration: 500,
                                delay: i * 100,
                                easing: quintOut,
                            }}
                        >
                            <div class="relative overflow-hidden grow">
                                <img
                                    src={category.imagen ||
                                        "/imagenotfound.jpg"}
                                    alt={`Imagen de ${category.nombre}`}
                                    class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                                    width="300"
                                    height="300"
                                    loading="lazy"
                                    on:error={(e) => {
                                        e.target.src = "/imagenotfound.jpg";
                                    }}
                                />
                                <div
                                    class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                                >
                                    <p class="text-gray-300 text-sm">
                                        {category.descripcion ||
                                            "Descripción no disponible"}
                                    </p>
                                </div>
                            </div>
                            <div class="p-6">
                                <h3
                                    class="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors"
                                >
                                    {category.nombre}
                                </h3>
                                <a
                                    href={`/catalogo`}
                                    class="block w-full bg-linear-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.03] active:scale-95 text-center"
                                >
                                    Ver colección
                                    <i class="fas fa-arrow-right ml-2"></i>
                                </a>
                            </div>
                        </article>
                    {/each}
                </div>
            {/if}

            <div class="mt-16 text-center">
                <p class="text-gray-400 mb-6">
                    ¿Quieres ver todos nuestros productos?
                </p>
                <a
                    href="/catalogo"
                    class="inline-flex items-center text-red-400 hover:text-white font-medium group transition-colors text-lg"
                >
                    Ir al catálogo completo
                    <i
                        class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
                    ></i>
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
</style>
