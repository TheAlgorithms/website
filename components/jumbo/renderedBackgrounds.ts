export const background1 = `<pre><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">change</span> (<span class="hljs-params">coins, amount</span>) </span>{
  <span class="hljs-keyword">const</span> combinations = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(amount + <span class="hljs-number">1</span>).fill(<span class="hljs-number">0</span>)
  combinations[<span class="hljs-number">0</span>] = <span class="hljs-number">1</span>

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; coins.length; i++) {
    <span class="hljs-keyword">const</span> coin = coins[i]

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = coin; j &lt; amount + <span class="hljs-number">1</span>; j++) {
      combinations[j] += combinations[j - coin]
    }
  }
  <span class="hljs-keyword">return</span> combinations[amount]
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">minimumCoins</span> (<span class="hljs-params">coins, amount</span>) </span>{
  <span class="hljs-comment">// minimumCoins[i] will store the minimum coins needed for amount i</span>
  <span class="hljs-keyword">const</span> minimumCoins = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(amount + <span class="hljs-number">1</span>).fill(<span class="hljs-number">0</span>)

  minimumCoins[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; amount + <span class="hljs-number">1</span>; i++) {
    minimumCoins[i] = <span class="hljs-built_in">Number</span>.MAX_SAFE_INTEGER
  }
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; amount + <span class="hljs-number">1</span>; i++) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; coins.length; j++) {
      <span class="hljs-keyword">const</span> coin = coins[j]
      <span class="hljs-keyword">if</span> (coin &lt;= i) {
        <span class="hljs-keyword">const</span> subRes = minimumCoins[i - coin]
        <span class="hljs-keyword">if</span> (subRes !== <span class="hljs-built_in">Number</span>.MAX_SAFE_INTEGER &amp;&amp; subRes + <span class="hljs-number">1</span> &lt; minimumCoins[i]) {
          minimumCoins[i] = subRes + <span class="hljs-number">1</span>
        }
      }
    }
  }
  <span class="hljs-keyword">return</span> minimumCoins[amount]
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> amount = <span class="hljs-number">12</span>
  <span class="hljs-keyword">const</span> coins = [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Number of combinations of getting change for '</span> + amount + <span class="hljs-string">' is: '</span> + change(coins, amount))
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Minimum number of coins required for amount :'</span> + amount + <span class="hljs-string">' is: '</span> + minimumCoins(coins, amount))
}

main()
</code></pre>`;

export const background2 = `<pre><code><span class="hljs-comment">#!/usr/bin/env python3</span>

<span class="hljs-string">"""
This is pure Python implementation of binary search algorithms

For doctests run following command:
python3 -m doctest -v binary_search.py

For manual testing run:
python3 binary_search.py
"""</span>
<span class="hljs-keyword">import</span> bisect
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, <span class="hljs-type">Optional</span>


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">bisect_left</span>(<span class="hljs-params">
    sorted_collection: <span class="hljs-type">List</span>[<span class="hljs-built_in">int</span>], item: <span class="hljs-built_in">int</span>, lo: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>, hi: <span class="hljs-built_in">int</span> = -<span class="hljs-number">1</span>
</span>) -&gt; <span class="hljs-built_in">int</span>:</span>
    <span class="hljs-string">"""
    Locates the first element in a sorted array that is larger or equal to a given
    value.

    It has the same interface as
    https://docs.python.org/3/library/bisect.html#bisect.bisect_left .

    :param sorted_collection: some ascending sorted collection with comparable items
    :param item: item to bisect
    :param lo: lowest index to consider (as in sorted_collection[lo:hi])
    :param hi: past the highest index to consider (as in sorted_collection[lo:hi])
    :return: index i such that all values in sorted_collection[lo:i] are &lt; item and all
        values in sorted_collection[i:hi] are &gt;= item.

    Examples:
    &gt;&gt;&gt; bisect_left([0, 5, 7, 10, 15], 0)
    0

    &gt;&gt;&gt; bisect_left([0, 5, 7, 10, 15], 6)
    2

    &gt;&gt;&gt; bisect_left([0, 5, 7, 10, 15], 20)
    5

    &gt;&gt;&gt; bisect_left([0, 5, 7, 10, 15], 15, 1, 3)
    3

    &gt;&gt;&gt; bisect_left([0, 5, 7, 10, 15], 6, 2)
    2
    """</span>
    <span class="hljs-keyword">if</span> hi &lt; <span class="hljs-number">0</span>:
        hi = <span class="hljs-built_in">len</span>(sorted_collection)

    <span class="hljs-keyword">while</span> lo &lt; hi:
        mid = (lo + hi) // <span class="hljs-number">2</span>
        <span class="hljs-keyword">if</span> sorted_collection[mid] &lt; item:
            lo = mid + <span class="hljs-number">1</span>
        <span class="hljs-keyword">else</span>:
            hi = mid

    <span class="hljs-keyword">return</span> lo


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">bisect_right</span>(<span class="hljs-params">
    sorted_collection: <span class="hljs-type">List</span>[<span class="hljs-built_in">int</span>], item: <span class="hljs-built_in">int</span>, lo: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>, hi: <span class="hljs-built_in">int</span> = -<span class="hljs-number">1</span>
</span>) -&gt; <span class="hljs-built_in">int</span>:</span>
    <span class="hljs-string">"""
    Locates the first element in a sorted array that is larger than a given value.

    It has the same interface as
    https://docs.python.org/3/library/bisect.html#bisect.bisect_right .

    :param sorted_collection: some ascending sorted collection with comparable items
    :param item: item to bisect
    :param lo: lowest index to consider (as in sorted_collection[lo:hi])
    :param hi: past the highest index to consider (as in sorted_collection[lo:hi])
    :return: index i such that all values in sorted_collection[lo:i] are &lt;= item and
        all values in sorted_collection[i:hi] are &gt; item.

    Examples:
    &gt;&gt;&gt; bisect_right([0, 5, 7, 10, 15], 0)
    1

    &gt;&gt;&gt; bisect_right([0, 5, 7, 10, 15], 15)
    5

    &gt;&gt;&gt; bisect_right([0, 5, 7, 10, 15], 6)
    2

    &gt;&gt;&gt; bisect_right([0, 5, 7, 10, 15], 15, 1, 3)
    3

    &gt;&gt;&gt; bisect_right([0, 5, 7, 10, 15], 6, 2)
    2
    """</span>
    <span class="hljs-keyword">if</span> hi &lt; <span class="hljs-number">0</span>:
        hi = <span class="hljs-built_in">len</span>(sorted_collection)

    <span class="hljs-keyword">while</span> lo &lt; hi:
        mid = (lo + hi) // <span class="hljs-number">2</span>
        <span class="hljs-keyword">if</span> sorted_collection[mid] &lt;= item:
            lo = mid + <span class="hljs-number">1</span>
        <span class="hljs-keyword">else</span>:
            hi = mid

    <span class="hljs-keyword">return</span> lo


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">insort_left</span>(<span class="hljs-params">
    sorted_collection: <span class="hljs-type">List</span>[<span class="hljs-built_in">int</span>], item: <span class="hljs-built_in">int</span>, lo: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>, hi: <span class="hljs-built_in">int</span> = -<span class="hljs-number">1</span>
</span>) -&gt; <span class="hljs-literal">None</span>:</span>
    <span class="hljs-string">"""
    Inserts a given value into a sorted array before other values with the same value.

    It has the same interface as
    https://docs.python.org/3/library/bisect.html#bisect.insort_left .

    :param sorted_collection: some ascending sorted collection with comparable items
    :param item: item to insert
    :param lo: lowest index to consider (as in sorted_collection[lo:hi])
    :param hi: past the highest index to consider (as in sorted_collection[lo:hi])

    Examples:
    &gt;&gt;&gt; sorted_collection = [0, 5, 7, 10, 15]
    &gt;&gt;&gt; insort_left(sorted_collection, 6)
    &gt;&gt;&gt; sorted_collection
    [0, 5, 6, 7, 10, 15]

    &gt;&gt;&gt; sorted_collection = [(0, 0), (5, 5), (7, 7), (10, 10), (15, 15)]
    &gt;&gt;&gt; item = (5, 5)
    &gt;&gt;&gt; insort_left(sorted_collection, item)
    &gt;&gt;&gt; sorted_collection
    [(0, 0), (5, 5), (5, 5), (7, 7), (10, 10), (15, 15)]
    &gt;&gt;&gt; item is sorted_collection[1]
    True
    &gt;&gt;&gt; item is sorted_collection[2]
    False

    &gt;&gt;&gt; sorted_collection = [0, 5, 7, 10, 15]
    &gt;&gt;&gt; insort_left(sorted_collection, 20)
    &gt;&gt;&gt; sorted_collection
    [0, 5, 7, 10, 15, 20]

    &gt;&gt;&gt; sorted_collection = [0, 5, 7, 10, 15]
    &gt;&gt;&gt; insort_left(sorted_collection, 15, 1, 3)
    &gt;&gt;&gt; sorted_collection
    [0, 5, 7, 15, 10, 15]
    """</span>
    sorted_collection.insert(bisect_left(sorted_collection, item, lo, hi), item)


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">insort_right</span>(<span class="hljs-params">
    sorted_collection: <span class="hljs-type">List</span>[<span class="hljs-built_in">int</span>], item: <span class="hljs-built_in">int</span>, lo: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>, hi: <span class="hljs-built_in">int</span> = -<span class="hljs-number">1</span>
</span>) -&gt; <span class="hljs-literal">None</span>:</span>
    <span class="hljs-string">"""
    Inserts a given value into a sorted array after other values with the same value.

    It has the same interface as
    https://docs.python.org/3/library/bisect.html#bisect.insort_right .

    :param sorted_collection: some ascending sorted collection with comparable items
    :param item: item to insert
    :param lo: lowest index to consider (as in sorted_collection[lo:hi])
    :param hi: past the highest index to consider (as in sorted_collection[lo:hi])

    Examples:
    &gt;&gt;&gt; sorted_collection = [0, 5, 7, 10, 15]
    &gt;&gt;&gt; insort_right(sorted_collection, 6)
    &gt;&gt;&gt; sorted_collection
    [0, 5, 6, 7, 10, 15]

    &gt;&gt;&gt; sorted_collection = [(0, 0), (5, 5), (7, 7), (10, 10), (15, 15)]
    &gt;&gt;&gt; item = (5, 5)
    &gt;&gt;&gt; insort_right(sorted_collection, item)
    &gt;&gt;&gt; sorted_collection
    [(0, 0), (5, 5), (5, 5), (7, 7), (10, 10), (15, 15)]
    &gt;&gt;&gt; item is sorted_collection[1]
    False
    &gt;&gt;&gt; item is sorted_collection[2]
    True

    &gt;&gt;&gt; sorted_collection = [0, 5, 7, 10, 15]
    &gt;&gt;&gt; insort_right(sorted_collection, 20)
    &gt;&gt;&gt; sorted_collection
    [0, 5, 7, 10, 15, 20]

    &gt;&gt;&gt; sorted_collection = [0, 5, 7, 10, 15]
    &gt;&gt;&gt; insort_right(sorted_collection, 15, 1, 3)
    &gt;&gt;&gt; sorted_collection
    [0, 5, 7, 15, 10, 15]
    """</span>
    sorted_collection.insert(bisect_right(sorted_collection, item, lo, hi), item)


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">binary_search</span>(<span class="hljs-params">sorted_collection: <span class="hljs-type">List</span>[<span class="hljs-built_in">int</span>], item: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-type">Optional</span>[<span class="hljs-built_in">int</span>]:</span>
    <span class="hljs-string">"""Pure implementation of binary search algorithm in Python

    Be careful collection must be ascending sorted, otherwise result will be
    unpredictable

    :param sorted_collection: some ascending sorted collection with comparable items
    :param item: item value to search
    :return: index of found item or None if item is not found

    Examples:
    &gt;&gt;&gt; binary_search([0, 5, 7, 10, 15], 0)
    0

    &gt;&gt;&gt; binary_search([0, 5, 7, 10, 15], 15)
    4

    &gt;&gt;&gt; binary_search([0, 5, 7, 10, 15], 5)
    1

    &gt;&gt;&gt; binary_search([0, 5, 7, 10, 15], 6)

    """</span>
    left = <span class="hljs-number">0</span>
    right = <span class="hljs-built_in">len</span>(sorted_collection) - <span class="hljs-number">1</span>

    <span class="hljs-keyword">while</span> left &lt;= right:
        midpoint = left + (right - left) // <span class="hljs-number">2</span>
        current_item = sorted_collection[midpoint]
        <span class="hljs-keyword">if</span> current_item == item:
            <span class="hljs-keyword">return</span> midpoint
        <span class="hljs-keyword">elif</span> item &lt; current_item:
            right = midpoint - <span class="hljs-number">1</span>
        <span class="hljs-keyword">else</span>:
            left = midpoint + <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">binary_search_std_lib</span>(<span class="hljs-params">sorted_collection: <span class="hljs-type">List</span>[<span class="hljs-built_in">int</span>], item: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-type">Optional</span>[<span class="hljs-built_in">int</span>]:</span>
    <span class="hljs-string">"""Pure implementation of binary search algorithm in Python using stdlib

    Be careful collection must be ascending sorted, otherwise result will be
    unpredictable

    :param sorted_collection: some ascending sorted collection with comparable items
    :param item: item value to search
    :return: index of found item or None if item is not found

    Examples:
    &gt;&gt;&gt; binary_search_std_lib([0, 5, 7, 10, 15], 0)
    0

    &gt;&gt;&gt; binary_search_std_lib([0, 5, 7, 10, 15], 15)
    4

    &gt;&gt;&gt; binary_search_std_lib([0, 5, 7, 10, 15], 5)
    1

    &gt;&gt;&gt; binary_search_std_lib([0, 5, 7, 10, 15], 6)

    """</span>
    index = bisect.bisect_left(sorted_collection, item)
    <span class="hljs-keyword">if</span> index != <span class="hljs-built_in">len</span>(sorted_collection) <span class="hljs-keyword">and</span> sorted_collection[index] == item:
        <span class="hljs-keyword">return</span> index
    <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>


<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">binary_search_by_recursion</span>(<span class="hljs-params">
    sorted_collection: <span class="hljs-type">List</span>[<span class="hljs-built_in">int</span>], item: <span class="hljs-built_in">int</span>, left: <span class="hljs-built_in">int</span>, right: <span class="hljs-built_in">int</span>
</span>) -&gt; <span class="hljs-type">Optional</span>[<span class="hljs-built_in">int</span>]:</span>

    <span class="hljs-string">"""Pure implementation of binary search algorithm in Python by recursion

    Be careful collection must be ascending sorted, otherwise result will be
    unpredictable
    First recursion should be started with left=0 and right=(len(sorted_collection)-1)

    :param sorted_collection: some ascending sorted collection with comparable items
    :param item: item value to search
    :return: index of found item or None if item is not found

    Examples:
    &gt;&gt;&gt; binary_search_by_recursion([0, 5, 7, 10, 15], 0, 0, 4)
    0

    &gt;&gt;&gt; binary_search_by_recursion([0, 5, 7, 10, 15], 15, 0, 4)
    4

    &gt;&gt;&gt; binary_search_by_recursion([0, 5, 7, 10, 15], 5, 0, 4)
    1

    &gt;&gt;&gt; binary_search_by_recursion([0, 5, 7, 10, 15], 6, 0, 4)

    """</span>
    <span class="hljs-keyword">if</span> right &lt; left:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>

    midpoint = left + (right - left) // <span class="hljs-number">2</span>

    <span class="hljs-keyword">if</span> sorted_collection[midpoint] == item:
        <span class="hljs-keyword">return</span> midpoint
    <span class="hljs-keyword">elif</span> sorted_collection[midpoint] &gt; item:
        <span class="hljs-keyword">return</span> binary_search_by_recursion(sorted_collection, item, left, midpoint - <span class="hljs-number">1</span>)
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> binary_search_by_recursion(sorted_collection, item, midpoint + <span class="hljs-number">1</span>, right)


<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">"__main__"</span>:
    user_input = <span class="hljs-built_in">input</span>(<span class="hljs-string">"Enter numbers separated by comma:\n"</span>).strip()
    collection = <span class="hljs-built_in">sorted</span>(<span class="hljs-built_in">int</span>(item) <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> user_input.split(<span class="hljs-string">","</span>))
    target = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">"Enter a single number to be found in the list:\n"</span>))
    result = binary_search(collection, target)
    <span class="hljs-keyword">if</span> result <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f"<span class="hljs-subst">{target}</span> was not found in <span class="hljs-subst">{collection}</span>."</span>)
    <span class="hljs-keyword">else</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f"<span class="hljs-subst">{target}</span> was found at position <span class="hljs-subst">{result}</span> in <span class="hljs-subst">{collection}</span>."</span>)
</code></pre>`;

export const background3 = `<pre><code><span class="hljs-comment">/* ARM assembly AARCH64 Raspberry PI 3B */</span>
<span class="hljs-comment">/*  program sha256_64.s   */</span>
 
<span class="hljs-comment">/*******************************************/</span>
<span class="hljs-comment">/* Constantes file                         */</span>
<span class="hljs-comment">/*******************************************/</span>
<span class="hljs-comment">/* for this file see task include a file in language AArch64 assembly*/</span>
<span class="hljs-symbol">.include</span> <span class="hljs-string">"../includeConstantesARM64.inc"</span>
 
<span class="hljs-symbol">.equ</span> LGHASH, <span class="hljs-number">32</span>                  <span class="hljs-comment">// result length </span>
 
<span class="hljs-comment">/*******************************************/</span>
<span class="hljs-comment">/* Structures                               */</span>
<span class="hljs-comment">/********************************************/</span>
<span class="hljs-comment">/* example structure  variables  */</span>
    .struct  <span class="hljs-number">0</span>
<span class="hljs-symbol">var_a:</span>                     <span class="hljs-comment">// a</span>
    .struct  var_a + <span class="hljs-number">4</span>
<span class="hljs-symbol">var_b:</span>                     <span class="hljs-comment">// b</span>
    .struct  var_b + <span class="hljs-number">4</span>
<span class="hljs-symbol">var_c:</span>                     <span class="hljs-comment">// c</span>
    .struct  var_c + <span class="hljs-number">4</span>
<span class="hljs-symbol">var_d:</span>                     <span class="hljs-comment">// d</span>
    .struct  var_d + <span class="hljs-number">4</span>
<span class="hljs-symbol">var_e:</span>                     <span class="hljs-comment">// e</span>
    .struct  var_e + <span class="hljs-number">4</span>
<span class="hljs-symbol">var_f:</span>                     <span class="hljs-comment">// f</span>
    .struct  var_f + <span class="hljs-number">4</span>
<span class="hljs-symbol">var_g:</span>                     <span class="hljs-comment">// g</span>
    .struct  var_g + <span class="hljs-number">4</span>
<span class="hljs-symbol">var_h:</span>                     <span class="hljs-comment">// h</span>
    .struct  var_h + <span class="hljs-number">4</span>
 
<span class="hljs-comment">/*********************************/</span>
<span class="hljs-comment">/* Initialized data              */</span>
<span class="hljs-comment">/*********************************/</span>
<span class="hljs-symbol">.data</span>
<span class="hljs-symbol">szMessRosetta:</span>        <span class="hljs-meta">.asciz</span> <span class="hljs-string">"Rosetta code"</span>
<span class="hljs-symbol">szMessTest1:</span>           <span class="hljs-meta">.asciz</span> <span class="hljs-string">"abc"</span> 
<span class="hljs-symbol">szMessSup64:</span>           <span class="hljs-meta">.ascii</span> <span class="hljs-string">"ABCDEFGHIJKLMNOPQRSTUVWXYZ"</span>
                       <span class="hljs-meta">.ascii</span> <span class="hljs-string">"abcdefghijklmnopqrstuvwxyz"</span>
                       <span class="hljs-meta">.asciz</span> <span class="hljs-string">"1234567890AZERTYUIOP"</span>
<span class="hljs-symbol">szMessTest2:</span>           <span class="hljs-meta">.asciz</span> <span class="hljs-string">"abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"</span>
<span class="hljs-symbol">szMessFinPgm:</span>          <span class="hljs-meta">.asciz</span> <span class="hljs-string">"Program End ok.\n"</span>
<span class="hljs-symbol">szMessResult:</span>          <span class="hljs-meta">.asciz</span> <span class="hljs-string">"Rosetta code =&gt; "</span>
<span class="hljs-symbol">szCarriageReturn:</span>   <span class="hljs-meta">.asciz</span> <span class="hljs-string">"\n"</span>
 
<span class="hljs-comment">/* array constantes Hi */</span>
<span class="hljs-symbol">tbConstHi:</span>           .int <span class="hljs-number">0x6A09E667</span>       <span class="hljs-comment">// H0</span>
                     .int <span class="hljs-number">0xBB67AE85</span>       <span class="hljs-comment">// H1</span>
                     .int <span class="hljs-number">0x3C6EF372</span>       <span class="hljs-comment">// H2</span>
                     .int <span class="hljs-number">0xA54FF53A</span>       <span class="hljs-comment">// H3</span>
                     .int <span class="hljs-number">0x510E527F</span>       <span class="hljs-comment">// H4</span>
                     .int <span class="hljs-number">0x9B05688C</span>       <span class="hljs-comment">// H5</span>
                     .int <span class="hljs-number">0x1F83D9AB</span>       <span class="hljs-comment">// H6</span>
                     .int <span class="hljs-number">0x5BE0CD19</span>       <span class="hljs-comment">// H7</span>
<span class="hljs-comment">/* array  64 constantes Kt */</span>
<span class="hljs-symbol">tbConstKt:</span>
  .int <span class="hljs-number">0x428a2f98</span>, <span class="hljs-number">0x71374491</span>, <span class="hljs-number">0xb5c0fbcf</span>, <span class="hljs-number">0xe9b5dba5</span>, <span class="hljs-number">0x3956c25b</span>, <span class="hljs-number">0x59f111f1</span>, <span class="hljs-number">0x923f82a4</span>, <span class="hljs-number">0xab1c5ed5</span>
  .int <span class="hljs-number">0xd807aa98</span>, <span class="hljs-number">0x12835b01</span>, <span class="hljs-number">0x243185be</span>, <span class="hljs-number">0x550c7dc3</span>, <span class="hljs-number">0x72be5d74</span>, <span class="hljs-number">0x80deb1fe</span>, <span class="hljs-number">0x9bdc06a7</span>, <span class="hljs-number">0xc19bf174</span>
  .int <span class="hljs-number">0xe49b69c1</span>, <span class="hljs-number">0xefbe4786</span>, <span class="hljs-number">0x0fc19dc6</span>, <span class="hljs-number">0x240ca1cc</span>, <span class="hljs-number">0x2de92c6f</span>, <span class="hljs-number">0x4a7484aa</span>, <span class="hljs-number">0x5cb0a9dc</span>, <span class="hljs-number">0x76f988da</span>
  .int <span class="hljs-number">0x983e5152</span>, <span class="hljs-number">0xa831c66d</span>, <span class="hljs-number">0xb00327c8</span>, <span class="hljs-number">0xbf597fc7</span>, <span class="hljs-number">0xc6e00bf3</span>, <span class="hljs-number">0xd5a79147</span>, <span class="hljs-number">0x06ca6351</span>, <span class="hljs-number">0x14292967</span>
  .int <span class="hljs-number">0x27b70a85</span>, <span class="hljs-number">0x2e1b2138</span>, <span class="hljs-number">0x4d2c6dfc</span>, <span class="hljs-number">0x53380d13</span>, <span class="hljs-number">0x650a7354</span>, <span class="hljs-number">0x766a0abb</span>, <span class="hljs-number">0x81c2c92e</span>, <span class="hljs-number">0x92722c85</span>
  .int <span class="hljs-number">0xa2bfe8a1</span>, <span class="hljs-number">0xa81a664b</span>, <span class="hljs-number">0xc24b8b70</span>, <span class="hljs-number">0xc76c51a3</span>, <span class="hljs-number">0xd192e819</span>, <span class="hljs-number">0xd6990624</span>, <span class="hljs-number">0xf40e3585</span>, <span class="hljs-number">0x106aa070</span>
  .int <span class="hljs-number">0x19a4c116</span>, <span class="hljs-number">0x1e376c08</span>, <span class="hljs-number">0x2748774c</span>, <span class="hljs-number">0x34b0bcb5</span>, <span class="hljs-number">0x391c0cb3</span>, <span class="hljs-number">0x4ed8aa4a</span>, <span class="hljs-number">0x5b9cca4f</span>, <span class="hljs-number">0x682e6ff3</span>
  .int <span class="hljs-number">0x748f82ee</span>, <span class="hljs-number">0x78a5636f</span>, <span class="hljs-number">0x84c87814</span>, <span class="hljs-number">0x8cc70208</span>, <span class="hljs-number">0x90befffa</span>, <span class="hljs-number">0xa4506ceb</span>, <span class="hljs-number">0xbef9a3f7</span>, <span class="hljs-number">0xc67178f2</span>
 
<span class="hljs-comment">/*********************************/</span>
<span class="hljs-comment">/* UnInitialized data            */</span>
<span class="hljs-comment">/*********************************/</span>
<span class="hljs-symbol">.bss</span>
<span class="hljs-symbol">.align</span> <span class="hljs-number">4</span>
<span class="hljs-symbol">qNbBlocs:</span>                    <span class="hljs-meta">.skip</span> <span class="hljs-number">8</span>
<span class="hljs-symbol">sZoneConv:</span>                   <span class="hljs-meta">.skip</span> <span class="hljs-number">24</span>
<span class="hljs-symbol">sZoneTrav:</span>                   <span class="hljs-meta">.skip</span> <span class="hljs-number">1000</span>
<span class="hljs-symbol">.align</span> <span class="hljs-number">8</span>
<span class="hljs-symbol">tbH:</span>                         <span class="hljs-meta">.skip</span> <span class="hljs-number">4</span> * <span class="hljs-number">8</span>         <span class="hljs-comment">// 8 variables H</span>
<span class="hljs-symbol">tbabcdefgh:</span>                  <span class="hljs-meta">.skip</span> <span class="hljs-number">4</span> * <span class="hljs-number">8</span>
<span class="hljs-symbol">tbW:</span>                         <span class="hljs-meta">.skip</span> <span class="hljs-number">4</span> * <span class="hljs-number">64</span>        <span class="hljs-comment">// 64 words W</span>
<span class="hljs-comment">/*********************************/</span>
<span class="hljs-comment">/*  code section                 */</span>
<span class="hljs-comment">/*********************************/</span>
<span class="hljs-symbol">.text</span>
<span class="hljs-symbol">.global</span> main 
<span class="hljs-symbol">main:</span>                                      <span class="hljs-comment">// entry of program </span>
 
    <span class="hljs-keyword">ldr</span> x0,qAdrszMessRosetta
    <span class="hljs-comment">//ldr x0,qAdrszMessTest1</span>
    <span class="hljs-comment">//ldr x0,qAdrszMessTest2</span>
    <span class="hljs-comment">//ldr x0,qAdrszMessSup64</span>
    <span class="hljs-keyword">bl</span> computeSHA256                       <span class="hljs-comment">// call routine SHA1</span>
 
    <span class="hljs-keyword">ldr</span> x0,qAdrszMessResult
    <span class="hljs-keyword">bl</span> affichageMess                       <span class="hljs-comment">// display message</span>
 
    <span class="hljs-keyword">ldr</span> x0, qAdrtbH
    <span class="hljs-keyword">bl</span> displaySHA1
 
    <span class="hljs-keyword">ldr</span> x0,qAdrszMessFinPgm
    <span class="hljs-keyword">bl</span> affichageMess                       <span class="hljs-comment">// display message</span>
 
 
<span class="hljs-number">100</span>:                                       <span class="hljs-comment">// standard end of the program </span>
    <span class="hljs-keyword">mov</span> x0,<span class="hljs-number">0</span>                               <span class="hljs-comment">// return code</span>
    <span class="hljs-keyword">mov</span> x8,EXIT                            <span class="hljs-comment">// request to exit program</span>
    <span class="hljs-keyword">svc</span> <span class="hljs-number">0</span>                                  <span class="hljs-comment">// perform the system call</span>
 
<span class="hljs-symbol">qAdrszCarriageReturn:</span>     .quad szCarriageReturn
<span class="hljs-symbol">qAdrszMessResult:</span>         .quad szMessResult
<span class="hljs-symbol">qAdrszMessRosetta:</span>        .quad szMessRosetta
<span class="hljs-symbol">qAdrszMessTest1:</span>          .quad szMessTest1
<span class="hljs-symbol">qAdrszMessTest2:</span>          .quad szMessTest2
<span class="hljs-symbol">qAdrsZoneTrav:</span>            .quad sZoneTrav
<span class="hljs-symbol">qAdrsZoneConv:</span>            .quad sZoneConv
<span class="hljs-symbol">qAdrszMessFinPgm:</span>         .quad szMessFinPgm
<span class="hljs-symbol">qAdrszMessSup64:</span>          .quad szMessSup64
<span class="hljs-comment">/******************************************************************/</span>
<span class="hljs-comment">/*     compute SHA1                         */</span> 
<span class="hljs-comment">/******************************************************************/</span>
<span class="hljs-comment">/* x0 contains the address of the message */</span>
<span class="hljs-symbol">computeSHA256:</span>
    stp x1,<span class="hljs-built_in">lr</span>,[<span class="hljs-built_in">sp</span>,-<span class="hljs-number">16</span>]!      <span class="hljs-comment">// save  registers</span>
    <span class="hljs-keyword">ldr</span> x1,qAdrsZoneTrav
    <span class="hljs-keyword">mov</span> x2,<span class="hljs-number">#0</span>                <span class="hljs-comment">// counter length </span>
<span class="hljs-symbol">debCopy:</span>                     <span class="hljs-comment">// copy string in work area</span>
    <span class="hljs-keyword">ldrb</span> w3,[x0,x2]
    <span class="hljs-keyword">strb</span> w3,[x1,x2]
    <span class="hljs-keyword">cmp</span> x3,<span class="hljs-number">#0</span>
    <span class="hljs-keyword">add</span> x4,x2,<span class="hljs-number">1</span>
    csel x2,x4,x2,ne
    <span class="hljs-keyword">bne</span> debCopy
    <span class="hljs-keyword">lsl</span> x6,x2,<span class="hljs-number">#3</span>             <span class="hljs-comment">// initial message length in bits </span>
    <span class="hljs-keyword">mov</span> x3,<span class="hljs-number">#0b10000000</span>       <span class="hljs-comment">// add bit 1 at end of string</span>
    <span class="hljs-keyword">strb</span> w3,[x1,x2]
    <span class="hljs-keyword">add</span> x2,x2,<span class="hljs-number">#1</span>             <span class="hljs-comment">// length in bytes</span>
    <span class="hljs-keyword">lsl</span> x4,x2,<span class="hljs-number">#3</span>             <span class="hljs-comment">// length in bits</span>
    <span class="hljs-keyword">mov</span> x3,<span class="hljs-number">#0</span>
<span class="hljs-symbol">addZeroes:</span>
    <span class="hljs-keyword">lsr</span> x5,x2,<span class="hljs-number">#6</span>
    <span class="hljs-keyword">lsl</span> x5,x5,<span class="hljs-number">#6</span>
    <span class="hljs-keyword">sub</span> x5,x2,x5
    <span class="hljs-keyword">cmp</span> x5,<span class="hljs-number">#56</span>
    <span class="hljs-keyword">beq</span> storeLength          <span class="hljs-comment">// yes -&gt; end add</span>
    <span class="hljs-keyword">strb</span> w3,[x1,x2]          <span class="hljs-comment">// add zero at message end</span>
    <span class="hljs-keyword">add</span> x2,x2,<span class="hljs-number">#1</span>              <span class="hljs-comment">// increment lenght bytes </span>
    <span class="hljs-keyword">add</span> x4,x4,<span class="hljs-number">#8</span>             <span class="hljs-comment">// increment length in bits</span>
    <span class="hljs-keyword">b</span> addZeroes
<span class="hljs-symbol">storeLength:</span>
    <span class="hljs-keyword">add</span> x2,x2,<span class="hljs-number">#4</span>             <span class="hljs-comment">// add four bytes</span>
    <span class="hljs-keyword">rev</span> w6,w6                <span class="hljs-comment">// inversion bits initials message length</span>
    <span class="hljs-keyword">str</span> w6,[x1,x2]           <span class="hljs-comment">// and store at end</span>
 
    <span class="hljs-keyword">ldr</span> x7,qAdrtbConstHi     <span class="hljs-comment">// constantes H address</span>
    <span class="hljs-keyword">ldr</span> x4,qAdrtbH           <span class="hljs-comment">// start area H</span>
    <span class="hljs-keyword">mov</span> x5,<span class="hljs-number">#0</span>
<span class="hljs-symbol">loopConst:</span>                   <span class="hljs-comment">// init array H with start constantes</span>
    <span class="hljs-keyword">ldr</span> w6,[x7,x5,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]    <span class="hljs-comment">// load constante</span>
    <span class="hljs-keyword">str</span> w6,[x4,x5,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]    <span class="hljs-comment">// and store</span>
    <span class="hljs-keyword">add</span> x5,x5,<span class="hljs-number">#1</span>
    <span class="hljs-keyword">cmp</span> x5,<span class="hljs-number">#8</span>
    <span class="hljs-keyword">blt</span> loopConst
                             <span class="hljs-comment">// split into block of 64 bytes</span>
    <span class="hljs-keyword">add</span> x2,x2,<span class="hljs-number">#4</span>                <span class="hljs-comment">// </span>
    <span class="hljs-keyword">lsr</span> x4,x2,<span class="hljs-number">#6</span>             <span class="hljs-comment">// blocks number</span>
    <span class="hljs-keyword">ldr</span> x0,qAdrqNbBlocs
    <span class="hljs-keyword">str</span> x4,[x0]              <span class="hljs-comment">// save block maxi</span>
    <span class="hljs-keyword">mov</span> x7,<span class="hljs-number">#0</span>                <span class="hljs-comment">// n° de block et x1 contient l adresse zone de travail</span>
<span class="hljs-symbol">loopBlock:</span>                   <span class="hljs-comment">// begin loop of each block of 64 bytes</span>
    <span class="hljs-keyword">mov</span> x0,x7
    <span class="hljs-keyword">bl</span> inversion             <span class="hljs-comment">// inversion each word because little indian</span>
    <span class="hljs-keyword">ldr</span> x3,qAdrtbW           <span class="hljs-comment">// working area W address</span>
    <span class="hljs-keyword">mov</span> x6,<span class="hljs-number">#0</span>                <span class="hljs-comment">// indice t</span>
                             <span class="hljs-comment">/* x2  address begin each block */</span>
    <span class="hljs-keyword">ldr</span> x1,qAdrsZoneTrav
    <span class="hljs-keyword">add</span> x2,x1,x7,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#6</span>      <span class="hljs-comment">//  compute block begin  indice * 4 * 16</span>
    <span class="hljs-comment">//vidregtit avantloop</span>
    <span class="hljs-comment">//mov x0,x2</span>
    <span class="hljs-comment">//vidmemtit  verifBloc x0 10</span>
<span class="hljs-symbol">loopPrep:</span>                    <span class="hljs-comment">// loop for expand 80 words</span>
    <span class="hljs-keyword">cmp</span> x6,<span class="hljs-number">#15</span>               <span class="hljs-comment">// </span>
    <span class="hljs-keyword">bgt</span> expand1
    <span class="hljs-keyword">ldr</span> w0,[x2,x6,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]    <span class="hljs-comment">// load word message</span>
    <span class="hljs-keyword">str</span> w0,[x3,x6,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]    <span class="hljs-comment">// store in first 16 block </span>
    <span class="hljs-keyword">b</span> expandEnd
 
<span class="hljs-symbol">expand1:</span>
    <span class="hljs-keyword">sub</span> x8,x6,<span class="hljs-number">#2</span>
    <span class="hljs-keyword">ldr</span> w9,[x3,x8,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">ror</span> w10,w9,<span class="hljs-number">#17</span>           <span class="hljs-comment">// fonction e1 (256)</span>
    <span class="hljs-keyword">ror</span> w11,w9,<span class="hljs-number">#19</span>
    <span class="hljs-keyword">eor</span> w10,w10,w11
    <span class="hljs-keyword">lsr</span> w11,w9,<span class="hljs-number">#10</span>
    <span class="hljs-keyword">eor</span> w10,w10,w11
    <span class="hljs-keyword">sub</span> x8,x6,<span class="hljs-number">#7</span>
    <span class="hljs-keyword">ldr</span> w9,[x3,x8,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">add</span> w9,w9,w10            <span class="hljs-comment">// + w - 7</span>
    <span class="hljs-keyword">sub</span> x8,x6,<span class="hljs-number">#15</span>
    <span class="hljs-keyword">ldr</span> w10,[x3,x8,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">ror</span> w11,w10,<span class="hljs-number">#7</span>          <span class="hljs-comment">// fonction e0 (256)</span>
    <span class="hljs-keyword">ror</span> w12,w10,<span class="hljs-number">#18</span>
    <span class="hljs-keyword">eor</span> w11,w11,w12
    <span class="hljs-keyword">lsr</span> w12,w10,<span class="hljs-number">#3</span>
    <span class="hljs-keyword">eor</span> w10,w11,w12
    <span class="hljs-keyword">add</span> w9,w9,w10
    <span class="hljs-keyword">sub</span> x8,x6,<span class="hljs-number">#16</span>
    <span class="hljs-keyword">ldr</span> w11,[x3,x8,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">add</span> w9,w9,w11
 
    <span class="hljs-keyword">str</span> w9,[x3,x6,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>] 
<span class="hljs-symbol">expandEnd:</span>
    <span class="hljs-keyword">add</span> x6,x6,<span class="hljs-number">#1</span>
    <span class="hljs-keyword">cmp</span> x6,<span class="hljs-number">#64</span>                 <span class="hljs-comment">// 64 words ?</span>
    <span class="hljs-keyword">blt</span> loopPrep               <span class="hljs-comment">// and loop</span>
 
 
    <span class="hljs-comment">/* COMPUTING THE MESSAGE DIGEST */</span>
    <span class="hljs-comment">/* x1  area H constantes address */</span>
    <span class="hljs-comment">/* x3  working area W address  */</span>
    <span class="hljs-comment">/* x5  address constantes K   */</span>
    <span class="hljs-comment">/* x6  counter t */</span>
    <span class="hljs-comment">/* x7  block counter */</span>
    <span class="hljs-comment">/* x8  addresse variables a b c d e f g h  */</span>
    <span class="hljs-comment">//ldr x0,qAdrtbW</span>
    <span class="hljs-comment">//vidmemtit  verifW80 x0 20</span>
                               <span class="hljs-comment">// init variable a b c d e f g h</span>
    <span class="hljs-keyword">ldr</span> x0,qAdrtbH
    <span class="hljs-keyword">ldr</span> x8,qAdrtbabcdefgh
    <span class="hljs-keyword">mov</span> x1,<span class="hljs-number">#0</span>
<span class="hljs-symbol">loopInita:</span>
    <span class="hljs-keyword">ldr</span> w9,[x0,x1,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">str</span> w9,[x8,x1,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">add</span> x1,x1,<span class="hljs-number">#1</span>
    <span class="hljs-keyword">cmp</span> x1,<span class="hljs-number">#8</span>
    <span class="hljs-keyword">blt</span> loopInita
 
 
    <span class="hljs-keyword">ldr</span> x1,qAdrtbConstHi
    <span class="hljs-keyword">ldr</span> x5,qAdrtbConstKt
    <span class="hljs-keyword">mov</span> x6,<span class="hljs-number">#0</span>
<span class="hljs-symbol">loop64T:</span>                      <span class="hljs-comment">// begin loop 64 t</span>
    <span class="hljs-keyword">ldr</span> w9,[x8,<span class="hljs-symbol">#var_h</span>]
    <span class="hljs-keyword">ldr</span> w10,[x8,<span class="hljs-symbol">#var_e</span>]       <span class="hljs-comment">// calcul T1</span>
    <span class="hljs-keyword">ror</span> w11,w10,<span class="hljs-number">#6</span>            <span class="hljs-comment">// fonction sigma 1</span>
    <span class="hljs-keyword">ror</span> w12,w10,<span class="hljs-number">#11</span>
    <span class="hljs-keyword">eor</span> w11,w11,w12
    <span class="hljs-keyword">ror</span> w12,w10,<span class="hljs-number">#25</span>
    <span class="hljs-keyword">eor</span> w11,w11,w12
    <span class="hljs-keyword">add</span> w9,w9,w11             <span class="hljs-comment">// h + sigma1 (e)</span>
    <span class="hljs-keyword">ldr</span> w0,[x8,<span class="hljs-symbol">#var_f</span>]        <span class="hljs-comment">//  fonction ch  x and y xor (non x and z)</span>
    <span class="hljs-keyword">ldr</span> w4,[x8,<span class="hljs-symbol">#var_g</span>]
    <span class="hljs-keyword">and</span> w11,w10,w0
    <span class="hljs-keyword">mvn</span> w12,w10
    <span class="hljs-keyword">and</span> w12,w12,w4
    <span class="hljs-keyword">eor</span> w11,w11,w12
    <span class="hljs-keyword">add</span> w9,w9,w11             <span class="hljs-comment">// h + sigma1 (e) + ch (e,f,g)</span>
    <span class="hljs-keyword">ldr</span> w0,[x5,x6,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]     <span class="hljs-comment">// load constantes k0</span>
    <span class="hljs-keyword">add</span> w9,w9,w0
    <span class="hljs-keyword">ldr</span> w0,[x3,x6,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]     <span class="hljs-comment">// Wt</span>
    <span class="hljs-keyword">add</span> w9,w9,w0
                              <span class="hljs-comment">// calcul T2</span>
    <span class="hljs-keyword">ldr</span> w10,[x8,<span class="hljs-symbol">#var_a</span>]       <span class="hljs-comment">// fonction sigma 0</span>
    <span class="hljs-keyword">ror</span> w11,w10,<span class="hljs-number">#2</span>
    <span class="hljs-keyword">ror</span> w12,w10,<span class="hljs-number">#13</span>
    <span class="hljs-keyword">eor</span> w11,w11,w12
    <span class="hljs-keyword">ror</span> w12,w10,<span class="hljs-number">#22</span>
    <span class="hljs-keyword">eor</span> w11,w11,w12
    <span class="hljs-keyword">ldr</span> w2,[x8,<span class="hljs-symbol">#var_b</span>]
    <span class="hljs-keyword">ldr</span> w4,[x8,<span class="hljs-symbol">#var_c</span>]
                              <span class="hljs-comment">// fonction maj x and y xor x and z xor y and z</span>
    <span class="hljs-keyword">and</span> w12,w10,w2
    <span class="hljs-keyword">and</span> w0,w10,w4
    <span class="hljs-keyword">eor</span> w12,w12,w0
    <span class="hljs-keyword">and</span> w0,w2,w4
    <span class="hljs-keyword">eor</span> w12,w12,w0            <span class="hljs-comment">//</span>
    <span class="hljs-keyword">add</span> w12,w12,w11           <span class="hljs-comment">// T2</span>
                              <span class="hljs-comment">// compute variables</span>
    <span class="hljs-keyword">ldr</span> w4,[x8,<span class="hljs-symbol">#var_g</span>]
    <span class="hljs-keyword">str</span> w4,[x8,<span class="hljs-symbol">#var_h</span>]
    <span class="hljs-keyword">ldr</span> w4,[x8,<span class="hljs-symbol">#var_f</span>]
    <span class="hljs-keyword">str</span> w4,[x8,<span class="hljs-symbol">#var_g</span>]
    <span class="hljs-keyword">ldr</span> w4,[x8,<span class="hljs-symbol">#var_e</span>]
    <span class="hljs-keyword">str</span> w4,[x8,<span class="hljs-symbol">#var_f</span>]
    <span class="hljs-keyword">ldr</span> w4,[x8,<span class="hljs-symbol">#var_d</span>]
    <span class="hljs-keyword">add</span> w4,w4,w9              <span class="hljs-comment">// add T1</span>
    <span class="hljs-keyword">str</span> w4,[x8,<span class="hljs-symbol">#var_e</span>]
    <span class="hljs-keyword">ldr</span> w4,[x8,<span class="hljs-symbol">#var_c</span>]
    <span class="hljs-keyword">str</span> w4,[x8,<span class="hljs-symbol">#var_d</span>]
    <span class="hljs-keyword">ldr</span> w4,[x8,<span class="hljs-symbol">#var_b</span>]
    <span class="hljs-keyword">str</span> w4,[x8,<span class="hljs-symbol">#var_c</span>]
    <span class="hljs-keyword">ldr</span> w4,[x8,<span class="hljs-symbol">#var_a</span>]
    <span class="hljs-keyword">str</span> w4,[x8,<span class="hljs-symbol">#var_b</span>]
    <span class="hljs-keyword">add</span> w4,w9,w12             <span class="hljs-comment">// add T1 T2</span>
    <span class="hljs-keyword">str</span> w4,[x8,<span class="hljs-symbol">#var_a</span>]
 
    <span class="hljs-keyword">add</span> x6,x6,<span class="hljs-number">#1</span>              <span class="hljs-comment">// increment t</span>
    <span class="hljs-keyword">cmp</span> x6,<span class="hljs-number">#64</span>
    <span class="hljs-keyword">blt</span> loop64T
                              <span class="hljs-comment">// End block</span>
    <span class="hljs-keyword">ldr</span> x0,qAdrtbH            <span class="hljs-comment">// start area H</span>
    <span class="hljs-keyword">mov</span> x10,<span class="hljs-number">#0</span>
<span class="hljs-symbol">loopStoreH:</span>
    <span class="hljs-keyword">ldr</span> w9,[x8,x10,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">ldr</span> w3,[x0,x10,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">add</span> w3,w3,w9
    <span class="hljs-keyword">str</span> w3,[x0,x10,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]    <span class="hljs-comment">// store variables in H0</span>
    <span class="hljs-keyword">add</span> x10,x10,<span class="hljs-number">#1</span>
    <span class="hljs-keyword">cmp</span> x10,<span class="hljs-number">#8</span>
    <span class="hljs-keyword">blt</span> loopStoreH
                              <span class="hljs-comment">// other bloc</span>
    <span class="hljs-keyword">add</span> x7,x7,<span class="hljs-number">#1</span>                 <span class="hljs-comment">// increment block</span>
    <span class="hljs-keyword">ldr</span> x0,qAdrqNbBlocs
    <span class="hljs-keyword">ldr</span> x4,[x0]               <span class="hljs-comment">// restaur maxi block</span>
    <span class="hljs-keyword">cmp</span> x7,x4                 <span class="hljs-comment">// maxi ?</span>
 
    <span class="hljs-keyword">blt</span> loopBlock             <span class="hljs-comment">//  loop other block</span>
 
    <span class="hljs-keyword">mov</span> x0,<span class="hljs-number">#0</span>                 <span class="hljs-comment">// routine OK</span>
<span class="hljs-number">100</span>:
    ldp x1,<span class="hljs-built_in">lr</span>,[<span class="hljs-built_in">sp</span>],<span class="hljs-number">16</span>              <span class="hljs-comment">// restaur  2 registers</span>
    ret                            <span class="hljs-comment">// return to address lr x30</span>
<span class="hljs-symbol">qAdrtbConstHi:</span>            .quad tbConstHi
<span class="hljs-symbol">qAdrtbConstKt:</span>            .quad tbConstKt
<span class="hljs-symbol">qAdrtbH:</span>                  .quad <span class="hljs-keyword">tbH</span>
<span class="hljs-symbol">qAdrtbW:</span>                  .quad tbW
<span class="hljs-symbol">qAdrtbabcdefgh:</span>           .quad tbabcdefgh
<span class="hljs-symbol">qAdrqNbBlocs:</span>             .quad qNbBlocs
<span class="hljs-comment">/******************************************************************/</span>
<span class="hljs-comment">/*     inversion des mots de 32 bits d un bloc                    */</span> 
<span class="hljs-comment">/******************************************************************/</span>
<span class="hljs-comment">/* x0 contains N° block   */</span>
<span class="hljs-symbol">inversion:</span>
    stp x1,<span class="hljs-built_in">lr</span>,[<span class="hljs-built_in">sp</span>,-<span class="hljs-number">16</span>]!            <span class="hljs-comment">// save  registers</span>
    stp x2,x3,[<span class="hljs-built_in">sp</span>,-<span class="hljs-number">16</span>]!            <span class="hljs-comment">// save  registers</span>
    <span class="hljs-keyword">ldr</span> x1,qAdrsZoneTrav
    <span class="hljs-keyword">add</span> x1,x1,x0,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#6</span>           <span class="hljs-comment">// debut du bloc</span>
    <span class="hljs-keyword">mov</span> x2,<span class="hljs-number">#0</span>
<span class="hljs-number">1</span>:                                                  <span class="hljs-comment">// start loop</span>
    <span class="hljs-keyword">ldr</span> w3,[x1,x2,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">rev</span> w3,w3
    <span class="hljs-keyword">str</span> w3,[x1,x2,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]
    <span class="hljs-keyword">add</span> x2,x2,<span class="hljs-number">#1</span>
    <span class="hljs-keyword">cmp</span> x2,<span class="hljs-number">#16</span>
    <span class="hljs-keyword">blt</span> <span class="hljs-number">1</span>b
<span class="hljs-number">100</span>:
    ldp x2,x3,[<span class="hljs-built_in">sp</span>],<span class="hljs-number">16</span>              <span class="hljs-comment">// restaur  2 registers</span>
    ldp x1,<span class="hljs-built_in">lr</span>,[<span class="hljs-built_in">sp</span>],<span class="hljs-number">16</span>              <span class="hljs-comment">// restaur  2 registers</span>
    ret                            <span class="hljs-comment">// return to address lr x30</span>
<span class="hljs-comment">/******************************************************************/</span>
<span class="hljs-comment">/*     display hash  SHA1                         */</span> 
<span class="hljs-comment">/******************************************************************/</span>
<span class="hljs-comment">/* x0 contains the address of hash  */</span>
<span class="hljs-symbol">displaySHA1:</span>
    stp x1,<span class="hljs-built_in">lr</span>,[<span class="hljs-built_in">sp</span>,-<span class="hljs-number">16</span>]!            <span class="hljs-comment">// save  registers</span>
    stp x2,x3,[<span class="hljs-built_in">sp</span>,-<span class="hljs-number">16</span>]!            <span class="hljs-comment">// save  registers</span>
    <span class="hljs-keyword">mov</span> x3,x0
    <span class="hljs-keyword">mov</span> x2,<span class="hljs-number">#0</span>
<span class="hljs-number">1</span>:
    <span class="hljs-keyword">ldr</span> w0,[x3,x2,<span class="hljs-keyword">lsl</span> <span class="hljs-number">#2</span>]          <span class="hljs-comment">// load 4 bytes</span>
    <span class="hljs-comment">//rev x0,x0                    // reverse bytes</span>
    <span class="hljs-keyword">ldr</span> x1,qAdrsZoneConv
    <span class="hljs-keyword">bl</span> conversion16_4W             <span class="hljs-comment">// conversion hexa</span>
    <span class="hljs-keyword">ldr</span> x0,qAdrsZoneConv
    <span class="hljs-keyword">bl</span> affichageMess
    <span class="hljs-keyword">add</span> x2,x2,<span class="hljs-number">#1</span>
    <span class="hljs-keyword">cmp</span> x2,<span class="hljs-symbol">#LGHASH</span> / <span class="hljs-number">4</span>
    <span class="hljs-keyword">blt</span> <span class="hljs-number">1</span>b                         <span class="hljs-comment">// and loop</span>
    <span class="hljs-keyword">ldr</span> x0,qAdrszCarriageReturn
    <span class="hljs-keyword">bl</span> affichageMess               <span class="hljs-comment">// display message</span>
<span class="hljs-number">100</span>:
    ldp x2,x3,[<span class="hljs-built_in">sp</span>],<span class="hljs-number">16</span>              <span class="hljs-comment">// restaur  2 registers</span>
    ldp x1,<span class="hljs-built_in">lr</span>,[<span class="hljs-built_in">sp</span>],<span class="hljs-number">16</span>              <span class="hljs-comment">// restaur  2 registers</span>
    ret                            <span class="hljs-comment">// return to address lr x30</span>
<span class="hljs-comment">/******************************************************************/</span>
<span class="hljs-comment">/*     conversion  hexadecimal register 32 bits                   */</span> 
<span class="hljs-comment">/******************************************************************/</span>
<span class="hljs-comment">/* x0 contains value and x1 address zone receptrice   */</span>
<span class="hljs-symbol">conversion16_4W:</span>
    stp x0,<span class="hljs-built_in">lr</span>,[<span class="hljs-built_in">sp</span>,-<span class="hljs-number">48</span>]!        <span class="hljs-comment">// save  registres</span>
    stp x1,x2,[<span class="hljs-built_in">sp</span>,<span class="hljs-number">32</span>]          <span class="hljs-comment">// save  registres</span>
    stp x3,x4,[<span class="hljs-built_in">sp</span>,<span class="hljs-number">16</span>]          <span class="hljs-comment">// save  registres</span>
    <span class="hljs-keyword">mov</span> x2,<span class="hljs-number">#28</span>                 <span class="hljs-comment">// start bit position</span>
    <span class="hljs-keyword">mov</span> x4,<span class="hljs-number">#0xF0000000</span>         <span class="hljs-comment">// mask</span>
    <span class="hljs-keyword">mov</span> x3,x0                  <span class="hljs-comment">// save entry value</span>
<span class="hljs-number">1</span>:                             <span class="hljs-comment">// start loop</span>
    <span class="hljs-keyword">and</span> x0,x3,x4               <span class="hljs-comment">// value register and mask</span>
    <span class="hljs-keyword">lsr</span> x0,x0,x2               <span class="hljs-comment">// right shift</span>
    <span class="hljs-keyword">cmp</span> x0,<span class="hljs-number">#10</span>                 <span class="hljs-comment">// &gt;= 10 ?</span>
    <span class="hljs-keyword">bge</span> <span class="hljs-number">2</span>f                     <span class="hljs-comment">// yes</span>
    <span class="hljs-keyword">add</span> x0,x0,<span class="hljs-number">#48</span>              <span class="hljs-comment">// no is digit</span>
    <span class="hljs-keyword">b</span> <span class="hljs-number">3</span>f
<span class="hljs-number">2</span>:
    <span class="hljs-keyword">add</span> x0,x0,<span class="hljs-number">#55</span>              <span class="hljs-comment">// else is a letter A-F</span>
<span class="hljs-number">3</span>:
    <span class="hljs-keyword">strb</span> w0,[x1],<span class="hljs-number">#1</span>            <span class="hljs-comment">// load result  and + 1 in address</span>
    <span class="hljs-keyword">lsr</span> x4,x4,<span class="hljs-number">#4</span>               <span class="hljs-comment">// shift mask 4 bits left</span>
    <span class="hljs-keyword">subs</span> x2,x2,<span class="hljs-number">#4</span>              <span class="hljs-comment">// decrement counter 4 bits &lt;= zero  ?</span>
    <span class="hljs-keyword">bge</span> <span class="hljs-number">1</span>b                     <span class="hljs-comment">// no -&gt; loop</span>
 
<span class="hljs-number">100</span>:                           <span class="hljs-comment">// fin standard de la fonction</span>
    ldp x3,x4,[<span class="hljs-built_in">sp</span>,<span class="hljs-number">16</span>]          <span class="hljs-comment">// restaur des  2 registres</span>
    ldp x1,x2,[<span class="hljs-built_in">sp</span>,<span class="hljs-number">32</span>]          <span class="hljs-comment">// restaur des  2 registres</span>
    ldp x0,<span class="hljs-built_in">lr</span>,[<span class="hljs-built_in">sp</span>],<span class="hljs-number">48</span>          <span class="hljs-comment">// restaur des  2 registres</span>
    ret    
<span class="hljs-comment">/********************************************************/</span>
<span class="hljs-comment">/*        File Include fonctions                        */</span>
<span class="hljs-comment">/********************************************************/</span>
<span class="hljs-comment">/* for this file see task include a file in language AArch64 assembly */</span>
<span class="hljs-symbol">.include</span> <span class="hljs-string">"../includeARM64.inc"</span>
</code></pre>`;
