<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/sass/app.scss')
    @vite('resources/css/app.css')
    {{-- @vite('resources/js/app.js') --}}
    @vite('resources/js/orbit.js')
</head>

<body class="">
    <div class="flex flex-col gap-y-[10px] py-[10px] ">
        <!-- Example A -->
        <div>
            <p class="text-[20px] font-bold">Example A</p>
            <span data-scene="orbit-a" class="w-[100vw] h-[50vw]"></span>
        </div>
        <div class="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <div>
            <p class="text-[20px] font-bold">Example B</p>
            <span data-scene="orbit-b" class="w-[98vw] h-[50vw] mx-auto"></span>
        </div>

        <div>
            <p class="text-[20px] font-bold">Example C</p>
            <span data-scene="orbit-c" class="w-[98vw] h-[50vw] mx-auto"></span>
        </div>
    </div>
</body>

</html>
