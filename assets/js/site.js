document.addEventListener('DOMContentLoaded',()=>
{
    const menu=document.getElementById('menuBtn'),mobile=document.getElementById('mobileMenu');
    menu?.addEventListener
    (
        'click',()=>mobile?.classList.toggle('hidden')
    );
    const bar=document.getElementById('navbar');
    if(bar)window.addEventListener
    (
        'scroll',()=>bar.classList.toggle('bg-[#20120e]/95',window.scrollY>20)
    );
});
