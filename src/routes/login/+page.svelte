<script>
    import { signIn } from "$lib/js/firebase";
    import { goto } from "$app/navigation";

    let email = "";
    let password = "";
    let error = "";
    let isLoading = false;

    const handleSubmit = async () => {
        if (!email || !password) {
            error = "Por favor ingresa tu correo y contraseña";
            return;
        }

        try {
            isLoading = true;
            error = "";
            await signIn(email, password);
            // Redirect to admin on successful login
            goto("/admin");
        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            error = "Error al iniciar sesión. Verifica tus credenciales.";
        } finally {
            isLoading = false;
        }
    };
</script>

<div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black p-4"
>
    <div
        class="w-full max-w-md rounded-xl overflow-hidden shadow-2xl shadow-red-900/20"
    >
        <!-- Header -->
        <div
            class="bg-linear-to-r from-red-900/80 to-red-800/80 px-6 py-8 text-center"
        >
            <h1 class="text-3xl font-bold text-white">Iniciar Sesión</h1>
            <p class="mt-2 text-sm text-red-100">
                Accede al panel de administración
            </p>
        </div>

        <!-- Form -->
        <div
            class="p-8 bg-gray-900/80 backdrop-blur-sm relative overflow-hidden"
        >
            <!-- Background Logo -->
            <div class="absolute inset-0">
                <div
                    class="w-full h-full bg-[url('/logo.svg')] bg-center bg-contain bg-no-repeat opacity-5"
                ></div>
            </div>
            <div class="relative z-10 space-y-6">
                {#if error}
                    <div
                        class="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r"
                    >
                        <div class="flex">
                            <div class="flex-0">
                                <i class="fas fa-exclamation-circle"></i>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                {/if}

                <form on:submit|preventDefault={handleSubmit} class="space-y-5">
                    <div class="space-y-1">
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-300"
                        >
                            Correo electrónico
                        </label>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            >
                                <i class="fas fa-envelope text-red-400"></i>
                            </div>
                            <input
                                type="email"
                                id="email"
                                bind:value={email}
                                class="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>
                    </div>

                    <div class="space-y-1">
                        <div class="flex items-center justify-between">
                            <label
                                for="password"
                                class="block text-sm font-medium text-gray-300"
                            >
                                Contraseña
                            </label>
                        </div>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            >
                                <i class="fas fa-lock text-red-400"></i>
                            </div>
                            <input
                                type="password"
                                id="password"
                                bind:value={password}
                                class="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div class="pt-4">
                        <button
                            type="submit"
                            class="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {#if isLoading}
                                <i class="fas fa-circle-notch fa-spin mr-2"></i>
                                Iniciando sesión...
                            {:else}
                                <i class="fas fa-sign-in-alt mr-2"></i>
                                Iniciar sesión
                            {/if}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-900/80 px-6 py-4 border-t border-gray-800/50">
            <p class="text-xs text-center text-gray-400">
                © 2025 Demon Store. Todos los derechos reservados
            </p>
        </div>
    </div>
</div>
